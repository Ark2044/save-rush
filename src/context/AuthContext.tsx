"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  signOut,
  RecaptchaVerifier,
  signInWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "@/lib/cookies";
import { auth } from "@/lib/firebase";
import authService from "@/services/authService";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  guestId: string | null;
  signInWithPhone: (phoneNumber: string) => Promise<any>;
  verifyOTP: (verificationId: string, otp: string) => Promise<any>;
  logout: () => Promise<void>;
  convertGuestToUser: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  const router = useRouter();
  // Function to create/update auth cookie
  const setAuthCookie = (token: string | null) => {
    if (token) {
      // Set JWT token cookie for 7 days expiration
      setCookie("jwt-token", token, 604800);
      // Keep firebase token for middleware compatibility
      setCookie("firebase-token", "authenticated", 604800);
    } else {
      // Clear cookies on logout
      deleteCookie("jwt-token");
      deleteCookie("firebase-token");
    }
  };

  // Function to get or create a guest ID
  const getGuestId = (): string => {
    // Check if we already have a guest ID in state
    if (guestId) return guestId;

    // Try to get the guest token from cookies
    const existingGuestToken =
      typeof window !== "undefined"
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("guest-token="))
            ?.split("=")[1]
        : null;

    if (existingGuestToken) {
      setGuestId(existingGuestToken);
      setIsGuest(true);
      return existingGuestToken;
    }

    // If no guest token exists, create one
    const newGuestToken = `guest-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setCookie("guest-token", newGuestToken, 60 * 60 * 24 * 7); // 7 days
    setGuestId(newGuestToken);
    setIsGuest(true);
    return newGuestToken;
  };

  // Modified useEffect to check for guest status
  useEffect(() => {
    let refreshTimer: NodeJS.Timeout | null = null;

    // Check if the user is a guest
    if (typeof window !== "undefined") {
      const guestTokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("guest-token="))
        ?.split("=")[1];
      if (guestTokenCookie) {
        setGuestId(guestTokenCookie);
        setIsGuest(true);
      }
    } // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed:", user?.phoneNumber);
      setUser(user);

      if (user) {
        // User is authenticated, not a guest
        setIsGuest(false);
        try {
          console.log("Exchanging Firebase token for JWT token");

          // Exchange Firebase authentication for backend JWT token
          const backendResponse = await authService.loginWithFirebase(user);

          if (backendResponse.token) {
            console.log("Setting JWT token in cookie");
            setAuthCookie(backendResponse.token);

            // Set up token refresh timer (JWT tokens typically have shorter expiry)
            refreshTimer = setInterval(async () => {
              if (auth.currentUser) {
                try {
                  console.log("Refreshing JWT token");
                  const refreshResponse = await authService.loginWithFirebase(
                    auth.currentUser
                  );
                  if (refreshResponse.token) {
                    setAuthCookie(refreshResponse.token);
                    console.log("JWT token refreshed successfully");
                  }
                } catch (error) {
                  console.error("Error refreshing JWT token:", error);
                }
              } else {
                console.log("No current user to refresh token");
                if (refreshTimer) {
                  clearInterval(refreshTimer);
                  refreshTimer = null;
                }
              }
            }, 25 * 60 * 1000); // 25 minutes (JWT tokens expire in 30 minutes)
          } else {
            console.warn(
              "No JWT token received from backend, continuing with Firebase auth only"
            );
            // Continue without backend JWT token - Firebase auth is still valid
          }
        } catch (error) {
          console.error(
            "Error exchanging Firebase token for JWT - detailed error:",
            {
              error: error,
              errorMessage:
                error instanceof Error ? error.message : String(error),
              userInfo: {
                uid: user.uid,
                phoneNumber: user.phoneNumber,
                email: user.email,
              },
            }
          );
          // Continue with Firebase authentication even if backend fails
        }
      } else {
        // Not logged in, check if guest
        if (!guestId) {
          getGuestId();
        }

        // Clear auth cookie when no user
        console.log("No user, clearing auth cookies");
        setAuthCookie(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    };
  }, []);

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      setError(null);

      // Validate phone number format
      if (!phoneNumber.match(/^\+[0-9]{10,14}$/)) {
        const errorMsg = "Please enter a valid phone number with country code";
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      // Clear any existing recaptcha
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = "";
      }

      // Create new RecaptchaVerifier instance
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
            // Clear the container to allow retry
            if (recaptchaContainer) {
              recaptchaContainer.innerHTML = "";
            }
          },
        }
      );

      toast.loading("Sending verification code...", { id: "sendingOTP" });
      console.log("Starting phone sign in process for:", phoneNumber);
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );
        console.log("Phone sign in started successfully");
        toast.dismiss("sendingOTP");
        toast.success("Verification code sent!");

        // Clear recaptcha after successful send
        recaptchaVerifier.clear();
        if (recaptchaContainer) {
          recaptchaContainer.innerHTML = "";
        }

        // Log the confirmation result structure
        console.log(
          "Confirmation result structure:",
          Object.keys(confirmationResult)
        );

        return confirmationResult;
      } catch (signInErr: any) {
        // Handle specific Firebase Auth errors
        console.error("Firebase phone sign-in error:", signInErr);
        toast.dismiss("sendingOTP");

        // Clear the recaptcha to allow retry
        try {
          recaptchaVerifier.clear();
        } catch (clearErr) {
          console.warn("Failed to clear recaptcha:", clearErr);
        }

        if (recaptchaContainer) {
          recaptchaContainer.innerHTML = "";
        }

        // Improve error message based on error code
        let errorMsg = "Failed to send verification code. Please try again.";
        if (signInErr.code === "auth/too-many-requests") {
          errorMsg = "Too many login attempts. Please try again later.";
        } else if (signInErr.code === "auth/invalid-phone-number") {
          errorMsg = "The phone number is invalid. Please check and try again.";
        }

        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      console.error("Phone sign in error:", err);
      setError(err.message);
      throw err;
    }
  };
  const verifyOTP = async (verificationId: string, otp: string) => {
    try {
      setError(null);
      console.log(
        "Creating credential with verification ID:",
        verificationId?.substring(0, 5) + "..."
      );

      if (!verificationId) {
        console.error("Missing verification ID");
        const errorMsg =
          "Verification session expired. Please request a new OTP.";
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      const credential = PhoneAuthProvider.credential(verificationId, otp);
      console.log("Signing in with credential");
      const result = await signInWithCredential(auth, credential);
      console.log("Signed in successfully", result?.user?.phoneNumber);

      // The JWT token exchange will happen automatically in onAuthStateChanged
      toast.success("Signed in successfully!");
      return result;
    } catch (err: any) {
      console.error("OTP verification error:", err.code, err.message);
      let errorMsg = "Failed to verify OTP. Please try again.";

      if (err.code === "auth/invalid-verification-code") {
        errorMsg =
          "The verification code you entered is invalid. Please check and try again.";
      } else if (err.code === "auth/code-expired") {
        errorMsg =
          "The verification code has expired. Please request a new one.";
      }

      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      // Clear auth cookies
      deleteCookie("jwt-token");
      deleteCookie("firebase-token");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Placeholder implementation for convertGuestToUser
  const convertGuestToUser = async () => {
    if (!guestId) {
      throw new Error("No guest session to convert.");
    }
    if (!user) {
      throw new Error("No authenticated user to convert guest session.");
    }

    // Example: Remove guest token and update state
    deleteCookie("guest-token");
    setGuestId(null);
    setIsGuest(false);

    // Optionally, you could migrate guest data here (e.g., from localStorage to Firestore)
    // This is app-specific and depends on your data model

    toast.success("Guest session converted to authenticated user.");
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isGuest,
        guestId,
        signInWithPhone,
        verifyOTP,
        logout,
        convertGuestToUser, // Added to match AuthContextType
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
