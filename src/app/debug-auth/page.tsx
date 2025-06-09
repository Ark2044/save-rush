"use client";

import { useState } from "react";
import { getCookie } from "@/lib/cookies";
import apiClient from "@/lib/apiClient";

export default function DebugAuth() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const checkTokens = () => {
    const jwtToken = getCookie("jwt-token");
    const firebaseToken = getCookie("firebase-token");
    const guestToken = getCookie("guest-token");

    setDebugInfo({
      jwtToken: jwtToken ? `${jwtToken.substring(0, 50)}...` : "Not found",
      firebaseToken: firebaseToken || "Not found",
      guestToken: guestToken
        ? `${guestToken.substring(0, 30)}...`
        : "Not found",
      allCookies: document.cookie,
    });
  };

  const testAPICall = async () => {
    setLoading(true);
    try {
      const token = await apiClient.getAuthToken();
      setDebugInfo((prev: any) => ({
        ...prev,
        apiToken: token ? `${token.substring(0, 50)}...` : "No token",
        tokenType: token?.startsWith("guest-")
          ? "Guest"
          : token?.startsWith("mock-")
          ? "Mock"
          : "JWT",
      }));

      // Test a simple API call
      const response = await apiClient.get("/users/profile", true, false);
      setDebugInfo((prev: any) => ({
        ...prev,
        apiCallResult: "Success",
        apiResponse: JSON.stringify(response, null, 2),
      }));
    } catch (error: any) {
      setDebugInfo((prev: any) => ({
        ...prev,
        apiCallResult: "Error",
        apiError: error.message,
      }));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>

      <div className="space-y-4">
        <button
          onClick={checkTokens}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Check Tokens
        </button>

        <button
          onClick={testAPICall}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test API Call"}
        </button>
      </div>

      {Object.keys(debugInfo).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Debug Information:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
