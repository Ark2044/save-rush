"use client";

import { GraphQLClient } from "graphql-request";
import { auth } from "./firebase";

// Switch between local development and production URLs
// Use default URLs if environment variables are not defined
const API_URL =
  process.env.API_URL || "https://save-rush-backend.onrender.com/graphql"; // Production API endpoint

// For REST API calls
export const REST_API_URL =
  process.env.REST_API_URL || "https://save-rush-backend.onrender.com/api"; // Production API endpoint

// // Switch between local development and production URLs (backup commented code)
// const API_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3001/graphql" // Local API endpoint
//     : "https://save-rush-backend.onrender.com/graphql"; // Production API endpoint

// // For REST API calls (backup commented code)
// export const REST_API_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3001/api" // Local API endpoint
//     : "https://save-rush-backend.onrender.com/api"; // Production API endpoint

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});

// Update headers with auth token when available
// Only run in browser environment
if (typeof window !== "undefined") {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      graphqlClient.setHeader("Authorization", `Bearer ${token}`);
    } else {
      graphqlClient.setHeader("Authorization", "");
    }
  });
}

export const GET_CATEGORIES = `
  query {
    categories {
      id
      title
      subCategories {
        id
        title
        items {
          id
          name
          imageUrl
          basePrice
        }
      }
    }
  }
`;

export const GET_SUBCATEGORIES = `
  query {
    subCategories {
      id
      title
      items {
        id
        name
        imageUrl
        basePrice
      }
    }
  }
`;
