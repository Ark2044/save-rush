import { NextRequest, NextResponse } from "next/server";

// Sample recommended items data
const recommendedItems = [
  {
    id: "rec1",
    name: "Organic Avocado",
    description: "Fresh ripe avocados (per piece)",
    basePrice: 79,
    discountedPrice: 59,
    imageUrl: "/assets/images/products/avocado.png",
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
    imageUrl: "/assets/images/products/bread.png",
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
    imageUrl: "/assets/images/products/yogurt.png",
    category: "Dairy & Breakfast",
    subCategory: "Yogurt",
    inStock: true,
  },
  {
    id: "rec5",
    name: "Green Tea (25 bags)",
    description: "Premium green tea bags",
    basePrice: 180,
    imageUrl: "/assets/images/products/tea.png",
    category: "Beverages",
    subCategory: "Tea & Coffee",
    inStock: true,
  },
  {
    id: "rec6",
    name: "Bananas (1 dozen)",
    description: "Fresh ripe bananas",
    basePrice: 60,
    discountedPrice: 50,
    imageUrl: "/assets/images/products/banana.png",
    category: "Fruits & Vegetables",
    subCategory: "Fresh Fruits",
    inStock: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, this would fetch personalized recommendations
    // based on user preferences, purchase history, etc.

    // For now, return sample data
    return NextResponse.json(recommendedItems, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching recommended items:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommended items" },
      { status: 500 }
    );
  }
}
