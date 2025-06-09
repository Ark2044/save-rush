"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP, signInWithPhone, user } = useAuth();
  const router = useRouter();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  // Handle countdown for resend button
  useEffect(() => {
    if (countdown > 0 && resendDisabled) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  // Initialize the inputs with refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otp.length);
    // Focus on first input when page loads
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Clone the current OTP array
    const newOtp = [...otp];

    // Handle paste event with multiple characters
    if (value.length > 1) {
      // Paste operation
      const pastedValues = value.split("").slice(0, otp.length - index);
      for (let i = 0; i < pastedValues.length; i++) {
        if (index + i < otp.length) {
          newOtp[index + i] = pastedValues[i];
        }
      }
      setOtp(newOtp);

      // Focus on the input after the last pasted digit or the last input
      const newFocusIndex = Math.min(
        index + pastedValues.length,
        otp.length - 1
      );
      inputRefs.current[newFocusIndex]?.focus();
      return;
    }

    // Normal input for a single digit
    newOtp[index] = value;
    setOtp(newOtp);

    // If a digit was entered and we're not on the last input, move to the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // If Backspace is pressed on an empty input, move to the previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      // Get the phone number from localStorage or context
      const phoneNumber = localStorage.getItem("phoneNumber");
      if (!phoneNumber) {
        toast.error("Phone number not found. Please go back to login page.");
        router.push("/login");
        return;
      }

      await signInWithPhone(phoneNumber);
      toast.success("Verification code resent successfully!");
      setResendDisabled(true);
      setCountdown(30);
    } catch (err) {
      toast.error("Failed to resend verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    // Check if OTP is complete
    if (otp.some((digit) => !digit)) {
      toast.error("Please enter all 6 digits of your verification code.");
      return;
    }
    try {
      setLoading(true);
      const otpValue = otp.join("");

      // Get the confirmationResult from localStorage (saved in login page)
      const verificationId = localStorage.getItem("verificationId");
      console.log("Retrieved verification ID:", verificationId);

      if (!verificationId) {
        toast.error("Verification session expired. Please request a new code.");
        router.push("/login");
        return;
      }

      // Verify the OTP
      await verifyOTP(verificationId, otpValue);
      toast.success("Verification successful! Logging you in...");

      // Clear localStorage items
      localStorage.removeItem("verificationId");
      localStorage.removeItem("phoneNumber");

      // Redirect to home page
      router.push("/");
    } catch (err) {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex login-container w-full h-screen overflow-hidden">
      {/* Left image - using standard img tag as fallback */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/login.png"
          alt="Grocery store"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="object-center"
        />
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 background-gradient relative">
        <div className="relative z-10 w-full max-w-md flex flex-col justify-between h-auto login-card">
          <div className="text-center mb-8">
            <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white ">
              Verify Your Phone
            </h1>
          </div>

          {/* OTP Input */}
          <div className="w-full space-y-6">
            <div className="text-center">
              <p className="text-white text-base mb-1">
                Enter the 6-digit verification code sent to your phone
              </p>
              <p className="text-lime-400 text-sm">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={resendDisabled || loading}
                  className={`font-medium underline ${
                    resendDisabled || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-lime-300"
                  }`}
                >
                  {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
                </button>
              </p>
            </div>

            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center rounded-3xl text-xl font-bold bg-white text-purple-900 border-2 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400/50"
                  disabled={loading}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.some((digit) => !digit)}
              className="w-full h-12 bg-lime-400 hover:bg-lime-500 rounded-full font-bold text-lg text-black transition-colors duration-200 ease-in-out disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2 h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </button>

            <div className="text-center">
              <button
                onClick={() => router.push("/login")}
                className="text-white text-sm hover:text-lime-400 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs">
            <p className="text-white">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-lime-400 underline hover:text-lime-300 transition-colors"
              >
                Terms of Use
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="text-lime-400 underline hover:text-lime-300 transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
