"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    name: "India",
    dialCode: "+91",
  });
  const countryModalRef = useRef<HTMLDivElement>(null);
  const { signInWithPhone, user } = useAuth();
  const router = useRouter();

  // Add debug function for troubleshooting
  const debugNavigationIssue = () => {
    console.log("Debug info - localStorage:", {
      verificationId: localStorage.getItem("verificationId"),
      phoneNumber: localStorage.getItem("phoneNumber"),
    });
    console.log("Debug info - router:", router);
    console.log("Debug info - user:", user);
  };

  useEffect(() => {
    if (user) {
      // Check if there's a return URL in the query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');
      
      if (returnUrl) {
        console.log('Redirecting to return URL:', returnUrl);
        router.push(decodeURIComponent(returnUrl));
      } else {
        router.push("/");
      }
    }

    // Debug the navigation issue
    debugNavigationIssue();
  }, [user, router]);

  // Close the country modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryModalRef.current &&
        !countryModalRef.current.contains(event.target as Node)
      ) {
        setShowCountryModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePhoneChange = (value: string) => {
    // Remove the dial code part and only keep the number
    const numberOnly = value.replace(selectedCountry.dialCode, "").trim();
    setPhone(numberOnly);
  };
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !phone) {
      toast.error("Please enter a valid phone number", {
        duration: 5000,
      });
      return;
    }
    try {
      setLoading(true);
      // Make sure the phone number starts with + for Firebase
      const formattedPhone = `${selectedCountry.dialCode}${phone}`; // Get confirmation result from signInWithPhone
      const confirmationResult = await signInWithPhone(formattedPhone);

      // Store the verification ID and phone number in localStorage
      if (confirmationResult) {
        // Store the verification ID directly from the confirmation result
        localStorage.setItem(
          "verificationId",
          confirmationResult._verificationId ||
            confirmationResult.verificationId
        );
        localStorage.setItem("phoneNumber", formattedPhone);

        // Log the confirmation result for debugging
        console.log("Confirmation result:", confirmationResult);

        // Also log all properties of the confirmation result object to better understand its structure
        console.log(
          "Confirmation result keys:",
          Object.keys(confirmationResult)
        );

        toast.success("Verification code sent! Redirecting...", {
          duration: 3000,
        });

        // Force direct navigation instead of using Next.js router
        console.log("Forcing direct navigation to OTP verification page");
        window.location.href = "/otp-verification";
      } else {
        toast.error("Failed to start verification. Please try again.");
      }
    } catch (err) {
      let errorMessage = "Failed to send verification code. Please try again.";
      if (err && typeof err === "object" && "code" in err) {
        if (err.code === "auth/invalid-phone-number")
          errorMessage = "Invalid phone number format.";
        if (err.code === "auth/too-many-requests")
          errorMessage = "Too many attempts. Please try again later.";
      }
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (
    code: string,
    dialCode: string,
    name: string
  ) => {
    setSelectedCountry({ code, name, dialCode });
    setShowCountryModal(false);
  };

  // Popular countries list for quick access
  const popularCountries = [
    { code: "in", name: "India", dialCode: "+91" },
    { code: "us", name: "United States", dialCode: "+1" },
    { code: "gb", name: "United Kingdom", dialCode: "+44" },
    { code: "ca", name: "Canada", dialCode: "+1" },
    { code: "au", name: "Australia", dialCode: "+61" },
    { code: "sg", name: "Singapore", dialCode: "+65" },
    { code: "ae", name: "United Arab Emirates", dialCode: "+971" },
    { code: "sa", name: "Saudi Arabia", dialCode: "+966" },
  ];

  interface CardProps {
    src: string;
    alt: string;
  }
  const Card = ({ src, alt }: CardProps) => (
    <div className="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-2xl bg-gradient-to-b from-purple-600 to-gray-200 flex items-center justify-center p-2 shadow-lg transform transition-transform hover:scale-105">
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="object-contain w-3/4 h-3/4"
      />
    </div>
  );
  return (
    <div className="flex min-h-screen login-container w-full">
      {/* Invisible reCAPTCHA container for Firebase phone auth */}
      <div id="recaptcha-container"></div>
      {/* Left image */}
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
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-3 sm:py-4 md:py-6 lg:py-8 px-3 sm:px-4 md:px-6 lg:px-8 background-gradient relative">
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-md mx-auto flex flex-col justify-between h-auto login-card">
          {/* Product cards grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Card
              src="/assets/images/login_screen/stationery.png"
              alt="Stationery"
            />{" "}
            <Card
              src="/assets/images/login_screen/skin_care.png"
              alt="Skin Care"
            />
            <Card src="/assets/images/login_screen/nutella.png" alt="Nutella" />
          </div>{" "}
          {/* Logo and Brand */}
          <div className="text-center mb-3 sm:mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black brandname stroke">
              SAVE RUSH
            </h1>
            <p className="mt-1 text-sm sm:text-base md:text-lg lg:text-xl font-bold stroke text-white">
              Anything, Anywhere.
            </p>
          </div>{" "}
          {/* Product cards grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Card src="/assets/images/login_screen/chips.png" alt="Chips" />
            <Card src="/assets/images/login_screen/grocery.png" alt="Grocery" />
            <Card src="/assets/images/login_screen/wheat.png" alt="Wheat" />
          </div>{" "}
          {/* Phone input */}{" "}
          <form
            onSubmit={handleContinue}
            className="w-full pt-3 sm:pt-5 space-y-6 sm:space-y-10"
          >
            <div className="w-full">
              <div className="relative">
                <div className="rounded-full overflow-hidden shadow-lg bg-white flex items-center h-10 sm:h-12">
                  {" "}
                  {/* Country selector button */}
                  <button
                    type="button"
                    onClick={() => setShowCountryModal(!showCountryModal)}
                    className="h-full pl-4 pr-3 flex items-center justify-center bg-white border-r border-gray-200"
                    aria-label="Select country"
                  >
                    <span className="flag-icon mr-2">
                      <img
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.code.toUpperCase()}.svg`}
                        alt={selectedCountry.name}
                        className="w-7 h-5 object-cover rounded-sm"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-medium text-gray-800">
                      {selectedCountry.dialCode}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Phone input field */}{" "}
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="flex-1 h-10 sm:h-12 px-3 outline-none text-sm sm:text-base text-gray-800"
                    disabled={loading}
                  />
                </div>{" "}
                {/* Country selector modal */}{" "}
                {showCountryModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-purple-900/80 to-purple-600/80 backdrop-blur-sm">
                    {" "}
                    <div
                      ref={countryModalRef}
                      className="bg-white rounded-2xl shadow-lg w-full max-w-[280px] sm:max-w-sm max-h-[80vh] overflow-hidden transform transition-all flex flex-col"
                      style={{
                        boxShadow: "0 10px 25px rgba(124, 58, 237, 0.2)",
                        animation: "scaleIn 0.25s ease-out forwards",
                      }}
                    >
                      {" "}
                      <div className="sticky top-0 py-4 px-5 border-b border-purple-100 bg-white z-10">
                        {" "}
                        <p className="font-bold text-purple-900 text-base sm:text-lg">
                          Select Country
                        </p>
                        <button
                          onClick={() => setShowCountryModal(false)}
                          className="absolute right-4 top-4 text-purple-500 hover:text-purple-700 transition-colors"
                          aria-label="Close"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                      </div>{" "}
                      <div className="py-2 overflow-y-auto max-h-[60vh]">
                        {popularCountries.map((country) => (
                          <div
                            key={country.code}
                            onClick={() =>
                              handleCountrySelect(
                                country.code,
                                country.dialCode,
                                country.name
                              )
                            }
                            className={`flex items-center px-3 sm:px-5 py-2.5 sm:py-3.5 cursor-pointer transition-all ${
                              selectedCountry.code === country.code
                                ? "bg-purple-50"
                                : "hover:bg-purple-50/50"
                            }`}
                          >
                            <div className="w-10 h-8 mr-4 rounded overflow-hidden shadow-sm border border-purple-100 flex items-center justify-center">
                              <img
                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code.toUpperCase()}.svg`}
                                alt={country.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="flex-1 text-gray-800 font-medium">
                              {country.name}
                            </span>
                            <span className="text-purple-600 font-semibold">
                              {country.dialCode}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>{" "}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 sm:h-12 bg-lime-400 hover:bg-lime-500 rounded-full font-bold text-base sm:text-lg text-black transition-colors duration-200 ease-in-out disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2 h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                  Processing...
                </>
              ) : (
                "Continue"
              )}
            </button>{" "}
          </form>{" "}
          {/* Footer */}
          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 md:pt-4 md:mt-3 text-center text-xs sm:text-sm">
            <p className="text-lime-400">By continuing, you agree to our</p>
            <p className="text-white">
              <a
                href="#"
                className="underline hover:text-lime-400 transition-colors"
              >
                Terms of Use
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="underline hover:text-lime-400 transition-colors"
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
