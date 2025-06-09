"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthStatus() {
  const { user, loading, error } = useAuth();
  const [authStatus, setAuthStatus] = useState("Checking...");

  useEffect(() => {
    if (loading) {
      setAuthStatus("Checking authentication status...");
    } else if (user) {
      setAuthStatus(`Signed in as ${user.phoneNumber || "User"}`);
    } else if (error) {
      setAuthStatus(`Auth Error: ${error}`);
    } else {
      setAuthStatus("Not signed in");
    }
  }, [user, loading, error]);

  if (!loading && !error && user) {
    return null; // Don't show anything when successfully logged in
  }

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg ${
        error ? "bg-red-500" : "bg-amber-500"
      } text-white shadow-lg z-50 text-sm`}
    >
      {authStatus}
    </div>
  );
}
