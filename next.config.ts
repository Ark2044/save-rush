import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL:
      process.env.API_URL || "https://save-rush-backend.onrender.com/graphql",
    REST_API_URL:
      process.env.REST_API_URL || "https://save-rush-backend.onrender.com/api",

    // Performance optimization: Environment-specific timer configurations
    NEXT_PUBLIC_TIMER_INTERVAL:
      process.env.NODE_ENV === "production" ? "10000" : "1000",
    NEXT_PUBLIC_REFRESH_INTERVAL:
      process.env.NODE_ENV === "production" ? "3600000" : "300000",
    NEXT_PUBLIC_QUICK_DELIVERY_INTERVAL:
      process.env.NODE_ENV === "production" ? "5000" : "1000",
    NEXT_PUBLIC_DAILY_DEALS_INTERVAL:
      process.env.NODE_ENV === "production" ? "300000" : "60000",
    NEXT_PUBLIC_HERO_BANNER_INTERVAL:
      process.env.NODE_ENV === "production" ? "10000" : "5000",
    NEXT_PUBLIC_TESTIMONIALS_INTERVAL:
      process.env.NODE_ENV === "production" ? "10000" : "5000",
    NEXT_PUBLIC_ENABLE_ANALYTICS:
      process.env.NODE_ENV === "production" ? "false" : "true",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
