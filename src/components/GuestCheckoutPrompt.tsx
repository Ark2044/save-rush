import Link from "next/link";

export default function GuestCheckoutPrompt() {
  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Sign in to continue</h3>
        <p className="text-gray-600 mb-4">
          Please sign in to your account to complete your purchase
        </p>
        <Link
          href="/login?redirect=checkout"
          className="inline-block bg-[#6B46C1] text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Login / Sign Up
        </Link>
      </div>
    </div>
  );
}
