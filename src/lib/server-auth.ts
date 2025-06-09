// Server-side authentication utilities
import { cookies } from "next/headers";

/**
 * Check if a user is authenticated based on cookies
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = cookies();
  return !!(await cookieStore).get("firebase-token");
};
