import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, username, email, phoneNumber, role } = body;

    // Validate required fields
    if (!uid) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // In a real application, this would:
    // 1. Validate the Firebase user
    // 2. Create or update user in database
    // 3. Generate JWT token
    // 4. Return user data and token

    // For now, return a mock response for development
    console.log("Mock user login:", {
      uid,
      username,
      email,
      phoneNumber,
      role,
    });

    // Generate a proper JWT token instead of mock token
    const jwtSecret =
      process.env.JWT_SECRET || "fallback-secret-key-for-development";
    const mockToken = jwt.sign(
      {
        userId: uid,
        role: role || "customer",
      },
      jwtSecret,
      { expiresIn: "30m" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User logged in successfully (mock mode)",
        token: mockToken,
        user: {
          uid,
          username: username || `user_${uid}`,
          email: email || `${uid}@example.com`,
          phoneNumber: phoneNumber || null,
          role: role || "customer",
          createdAt: new Date().toISOString(),
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in user login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during login",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
