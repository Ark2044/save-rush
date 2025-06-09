"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCookie } from "@/lib/cookies";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isGuest } = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Function to check if we're authenticated
    const checkAuthentication = async () => {
      // Wait for loading to complete and check auth state
      if (!loading) {
        console.log("Auth check - User state:", !!user);
        console.log("Auth check - Guest state:", isGuest);

        // Primary check: Firebase user exists (JWT token is optional)
        if (!user) {
          // Double-check cookie existence as a fallback
          const token = getCookie("firebase-token");
          console.log("Auth check - Token in cookie:", !!token);

          if (!token) {
            console.log("User not authenticated, redirecting to login");
            setAuthError("Please log in to access this page");
            // Save current URL to redirect back after login
            const currentPath = window.location.pathname;
            router.push(`/login?returnUrl=${encodeURIComponent(currentPath)}`);
            return;
          }
        }
        
        // User is authenticated (either Firebase user exists or token exists)
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [user, loading, router, isGuest]);

  // Show friendly error if authentication is required
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Authentication Required
          </div>
          <p className="mb-4">{authError}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  // Show loading state while checking authentication
  if (loading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-700">Verifying your session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
