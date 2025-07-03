import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the Firebase authentication token from cookies
  const tokenCookie = request.cookies.get("firebase-token");

  // Create a guest token if one doesn't exist
  const guestToken = request.cookies.get("guest-token");

  // Debug information (disabled in production)
  if (process.env.NODE_ENV === "development") {
    console.log(`Middleware check for: ${request.nextUrl.pathname}`);
    console.log(`Auth token present: ${!!tokenCookie}`);
    console.log(`Guest token present: ${!!guestToken}`);
  }

  // Define auth routes (routes that don't require authentication but are auth-related)
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/otp-verification");

  // Define public routes that should be accessible without login
  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/category") ||
    request.nextUrl.pathname.startsWith("/search") ||
    request.nextUrl.pathname.startsWith("/products");

  // Define checkout routes (can be used by both guest and authenticated users)
  const isCheckoutRoute =
    request.nextUrl.pathname.startsWith("/cart") ||
    request.nextUrl.pathname.startsWith("/checkout");

  // Define strictly protected routes (MUST have authentication)
  const isStrictlyProtectedRoute =
    request.nextUrl.pathname.startsWith("/account") ||
    request.nextUrl.pathname.startsWith("/orders") ||
    request.nextUrl.pathname.startsWith("/payments") ||
    request.nextUrl.pathname.startsWith("/addresses");

  if (process.env.NODE_ENV === "development") {
    console.log(
      `Route classification: ${
        isAuthRoute
          ? "Auth"
          : isPublicRoute
          ? "Public"
          : isCheckoutRoute
          ? "Checkout"
          : isStrictlyProtectedRoute
          ? "Strictly Protected"
          : "Other"
      }`
    );
  }

  // If the user is not authenticated and trying to access strictly protected routes
  if (!tokenCookie && isStrictlyProtectedRoute) {
    if (process.env.NODE_ENV === "development") {
      console.log("User not authenticated. Redirecting to login");
    }
    // Save the current URL to redirect back after login
    const returnUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${returnUrl}`, request.url)
    );
  }

  // If the user is authenticated and trying to access login page
  if (tokenCookie && isAuthRoute) {
    if (process.env.NODE_ENV === "development") {
      console.log("User already authenticated. Redirecting from auth page");
    }

    // Check if there's a return URL in the query parameters
    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get("returnUrl");

    if (returnUrl) {
      if (process.env.NODE_ENV === "development") {
        console.log("Redirecting to return URL:", returnUrl);
      }
      return NextResponse.redirect(
        new URL(decodeURIComponent(returnUrl), request.url)
      );
    }

    // Default redirect to home if no return URL
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For checkout routes, we allow both authenticated and guest users
  if (isCheckoutRoute && !tokenCookie && !guestToken) {
    // Create a next response to be able to set cookies
    const response = NextResponse.next();

    // Create a random guest token
    const newGuestToken = `guest-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    // Set the guest token cookie
    response.cookies.set("guest-token", newGuestToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("Created guest token for checkout");
    }
    return response;
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Middleware allowing request to continue");
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     * - public (public files)
     * - ingredients (ingredient images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets|public|ingredients).*)",
  ],
};
