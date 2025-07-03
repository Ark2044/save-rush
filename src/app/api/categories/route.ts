import { NextRequest, NextResponse } from "next/server";

// Sample categories data
const categories = [
  {
    id: "cat1",
    title: "Fruits & Vegetables",
    imageUrl: "/assets/images/categories/vegetables_and_fruits.png",
    subCategories: [
      {
        id: "sub1",
        title: "Fresh Fruits",
        items: [
          {
            id: "item1",
            name: "Organic Avocado",
            imageUrl: "/assets/images/products/milk.png",
            basePrice: 79,
            inStock: true,
          },
          {
            id: "item2",
            name: "Bananas (1 dozen)",
            imageUrl: "/assets/images/products/milk.png",
            basePrice: 60,
            inStock: true,
          },
        ],
      },
      {
        id: "sub2",
        title: "Fresh Vegetables",
        items: [
          {
            id: "item3",
            name: "Fresh Tomatoes (1kg)",
            imageUrl: "/assets/images/ingredients/onion.png",
            basePrice: 45,
            inStock: true,
          },
        ],
      },
    ],
  },
  {
    id: "cat2",
    title: "Dairy & Breakfast",
    imageUrl: "/assets/images/categories/bakery_and_dairy.png",
    subCategories: [
      {
        id: "sub3",
        title: "Milk & Dairy",
        items: [
          {
            id: "item4",
            name: "Fresh Milk (1L)",
            imageUrl: "/assets/images/products/milk.png",
            basePrice: 65,
            inStock: true,
          },
        ],
      },
      {
        id: "sub4",
        title: "Eggs",
        items: [
          {
            id: "item5",
            name: "Brown Eggs (6 pcs)",
            imageUrl: "/assets/images/products/eggs.png",
            basePrice: 72,
            inStock: true,
          },
        ],
      },
    ],
  },
  {
    id: "cat3",
    title: "Bakery",
    imageUrl: "/assets/images/categories/bakery_and_dairy.png",
    subCategories: [
      {
        id: "sub5",
        title: "Bread",
        items: [
          {
            id: "item6",
            name: "Whole Grain Bread",
            imageUrl: "/assets/images/products/milk.png",
            basePrice: 45,
            inStock: true,
          },
        ],
      },
    ],
  },
  {
    id: "cat4",
    title: "Beverages",
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    subCategories: [
      {
        id: "sub6",
        title: "Tea & Coffee",
        items: [
          {
            id: "item7",
            name: "Green Tea (25 bags)",
            imageUrl: "/assets/images/products/milk.png",
            basePrice: 180,
            inStock: true,
          },
        ],
      },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, this would fetch categories from a database
    // For now, return sample data
    return NextResponse.json(categories, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
