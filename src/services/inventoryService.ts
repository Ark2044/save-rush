"use client";

import apiClient from "@/lib/apiClient";
import { graphqlClient, GET_CATEGORIES } from "@/lib/graphql";

// GraphQL queries for inventory
const GET_INVENTORY_DETAIL = `
  query GetItemDetail($itemId: ID!) {
    item(id: $itemId) {
      id
      name
      description
      imageUrl
      basePrice
      variants {
        id
        name
        price
        size
        inStock
      }
      category {
        id
        title
      }
      subCategory {
        id
        title
      }
    }
  }
`;

const GET_ITEMS_BY_CATEGORY = `
  query GetItemsByCategory($categoryId: ID!) {
    category(id: $categoryId) {
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
          inStock
        }
      }
    }
  }
`;

const GET_ITEMS_BY_SUBCATEGORY = `
  query GetItemsBySubcategory($subcategoryId: ID!) {
    subCategory(id: $subcategoryId) {
      id
      title
      items {
        id
        name
        imageUrl
        basePrice
        inStock
      }
    }
  }
`;

const SEARCH_ITEMS = `
  query SearchItems($query: String!) {
    searchItems(query: $query) {
      id
      name
      imageUrl
      basePrice
      inStock
      category {
        id
        title
      }
    }
  }
`;

/**
 * Inventory Service - handles all inventory-related API operations
 */
const inventoryService = {
  /**
   * Get all categories with their subcategories
   */
  getCategories: async () => {
    try {
      const data = (await graphqlClient.request(GET_CATEGORIES)) as any;
      return data.categories;
    } catch (error) {
      console.error("Failed to fetch categories from GraphQL:", error);

      try {
        // Fall back to REST API
        return await apiClient.get("/categories");
      } catch (restError) {
        console.error("Failed to fetch categories from REST API:", restError);

        try {
          // Fall back to local Next.js API route
          const response = await fetch("/api/categories");
          if (response.ok) {
            const data = await response.json();
            return data;
          }
        } catch (localError) {
          console.error(
            "Failed to fetch categories from local API:",
            localError
          );
        }

        // Return empty array as final fallback
        console.log("Using empty categories as final fallback");
        return [];
      }
    }
  },

  /**
   * Get detailed information about a specific item
   */
  getItemDetail: async (itemId: string) => {
    try {
      const data = (await graphqlClient.request(GET_INVENTORY_DETAIL, {
        itemId,
      })) as any;
      return data.item;
    } catch (error) {
      console.error(`Failed to fetch item ${itemId}:`, error);
      // Fall back to REST API if GraphQL fails
      return apiClient.get(`/items/${itemId}`);
    }
  },

  /**
   * Search for items by name or category
   */
  searchItems: async (query: string) => {
    try {
      const data = (await graphqlClient.request(SEARCH_ITEMS, {
        query,
      })) as any;
      return data.searchItems;
    } catch (error) {
      console.error("Failed to search items:", error);
      // Fall back to REST API if GraphQL fails
      return apiClient.get(`/items/search?q=${encodeURIComponent(query)}`);
    }
  },
  /**
   * Get popular or recommended items
   */ getRecommendedItems: async () => {
    try {
      // Try local Next.js API route first
      const response = await fetch("/api/items/recommended");
      if (response.ok) {
        const data = await response.json();
        return data;
      }

      // Fall back to external REST API if local API fails
      return apiClient.get("/items/recommended", false, true); // Don't require auth, allow guest
    } catch (error) {
      console.error("Failed to fetch recommended items:", error);
      // If all APIs fail, return sample data for guest users
      console.log("Returning sample recommendations for guest mode");
      return [
        {
          id: "rec1",
          name: "Organic Avocado",
          description: "Fresh ripe avocados (per piece)",
          basePrice: 79,
          discountedPrice: 59,
          imageUrl: "/assets/images/products/milk.png",
          category: "Fruits & Vegetables",
          subCategory: "Fresh Fruits",
          inStock: true,
        },
        {
          id: "rec2",
          name: "Brown Eggs (6 pcs)",
          description: "Farm fresh brown eggs",
          basePrice: 72,
          imageUrl: "/assets/images/products/eggs.png",
          category: "Dairy & Breakfast",
          subCategory: "Eggs",
          inStock: true,
        },
        {
          id: "rec3",
          name: "Whole Grain Bread",
          description: "Freshly baked whole grain bread (400g)",
          basePrice: 45,
          discountedPrice: 40,
          imageUrl: "/assets/images/products/milk.png",
          category: "Bakery",
          subCategory: "Bread",
          inStock: true,
        },
        {
          id: "rec4",
          name: "Fresh Greek Yogurt",
          description: "Creamy Greek yogurt (500g)",
          basePrice: 120,
          discountedPrice: 99,
          imageUrl: "/assets/images/products/milk.png",
          category: "Dairy & Breakfast",
          subCategory: "Yogurt",
          inStock: true,
        },
      ];
    }
  },

  /**
   * Get items by category ID
   */
  getItemsByCategory: async (categoryId: string) => {
    try {
      const data = (await graphqlClient.request(GET_ITEMS_BY_CATEGORY, {
        categoryId,
      })) as any;
      return data.category;
    } catch (error) {
      console.error(`Failed to fetch items for category ${categoryId}:`, error);
      // Fall back to REST API if GraphQL fails
      return apiClient.get(`/items/category/${categoryId}`);
    }
  },

  /**
   * Get items by subcategory ID
   */
  getItemsBySubcategory: async (subcategoryId: string) => {
    try {
      const data = (await graphqlClient.request(GET_ITEMS_BY_SUBCATEGORY, {
        subcategoryId,
      })) as any;
      return data.subCategory;
    } catch (error) {
      console.error(
        `Failed to fetch items for subcategory ${subcategoryId}:`,
        error
      );
      // Fall back to REST API if GraphQL fails
      return apiClient.get(`/items/subcategory/${subcategoryId}`);
    }
  },
};

export default inventoryService;
