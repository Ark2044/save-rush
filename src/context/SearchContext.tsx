"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Sample product data structure for search results
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  discountedPrice?: number;
  imageUrl: string;
  category: string;
  subCategory: string;
  inStock: boolean;
  quantity?: number;
}

// Define the shape of our context
interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  clearSearch: () => void;
}

// Create the context with default values
const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  searchResults: [],
  isLoading: false,
  error: null,
  setSearchQuery: () => {},
  performSearch: () => {},
  clearSearch: () => {},
});

// Sample product data for mock results
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Lays Classic Potato Chips",
    description: "Classic salted potato chips for your snacking pleasure",
    basePrice: 20,
    discountedPrice: 18,
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    category: "Snacks",
    subCategory: "Chips",
    inStock: true,
  },
  {
    id: "2",
    name: "Kurkure Masala Munch",
    description: "Spicy masala flavored crunchy snack",
    basePrice: 20,
    imageUrl: "/assets/images/categories/chips_and_namkeen.png",
    category: "Snacks",
    subCategory: "Namkeen",
    inStock: true,
  },
  {
    id: "3",
    name: "Dairy Milk Chocolate",
    description: "Creamy milk chocolate bar",
    basePrice: 40,
    discountedPrice: 35,
    imageUrl: "/assets/images/categories/chocolates.png",
    category: "Confectionery",
    subCategory: "Chocolate",
    inStock: true,
  },
  {
    id: "4",
    name: "Amul Butter",
    description: "Pasteurized table butter",
    basePrice: 50,
    imageUrl: "/assets/images/ingredients/cheese.png",
    category: "Dairy",
    subCategory: "Butter & Spreads",
    inStock: true,
  },
  {
    id: "5",
    name: "Maggi Noodles",
    description: "2-Minute instant noodles",
    basePrice: 14,
    discountedPrice: 12,
    imageUrl: "/assets/images/categories/snacks.png",
    category: "Ready to Cook",
    subCategory: "Instant Noodles",
    inStock: true,
  },
  {
    id: "6",
    name: "Fresh Tomatoes",
    description: "Farm fresh red tomatoes",
    basePrice: 40,
    imageUrl: "/assets/images/ingredients/tomato.png",
    category: "Vegetables",
    subCategory: "Fresh Vegetables",
    inStock: true,
  },
  {
    id: "7",
    name: "Onions",
    description: "Fresh onions, approx 1kg",
    basePrice: 30,
    imageUrl: "/assets/images/ingredients/onion.png",
    category: "Vegetables",
    subCategory: "Fresh Vegetables",
    inStock: true,
  },
  {
    id: "8",
    name: "Brown Rice",
    description: "Organic brown rice, 1kg pack",
    basePrice: 80,
    discountedPrice: 70,
    imageUrl: "/assets/images/login_screen/wheat.png",
    category: "Staples",
    subCategory: "Rice & Rice Products",
    inStock: true,
  },
  {
    id: "9",
    name: "Tata Salt",
    description: "Iodized salt, 1kg pack",
    basePrice: 22,
    imageUrl: "/assets/images/meal_options/pizza.png",
    category: "Staples",
    subCategory: "Salt & Sugar",
    inStock: true,
  },
  {
    id: "10",
    name: "Surf Excel Detergent",
    description: "Stain removal detergent powder, 1kg",
    basePrice: 140,
    discountedPrice: 120,
    imageUrl: "/assets/images/categories/cleaning.png",
    category: "Household",
    subCategory: "Laundry Essentials",
    inStock: true,
  },
];

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Perform search with the given query
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setError("Please enter a search term");
        toast.error("Please enter a search term");
        return;
      }

      setIsLoading(true);
      setError(null);
      setSearchQuery(query);

      // Simulate API call delay
      setTimeout(() => {
        try {
          // Filter products based on search query (case insensitive)
          const filteredResults = sampleProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.category.toLowerCase().includes(query.toLowerCase()) ||
              product.subCategory.toLowerCase().includes(query.toLowerCase()) ||
              product.description.toLowerCase().includes(query.toLowerCase())
          );

          setSearchResults(filteredResults);
          setIsLoading(false);

          if (filteredResults.length === 0) {
            setError(`No results found for "${query}"`);
            toast.error(`No results found for "${query}"`);
          } else {
            toast.success(
              `Found ${filteredResults.length} result${
                filteredResults.length !== 1 ? "s" : ""
              }`
            );
          } // Navigate to search results page if not already there
          if (!window.location.pathname.includes("/search")) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
          }
        } catch (err) {
          setError("Something went wrong with the search. Please try again.");
          toast.error(
            "Something went wrong with the search. Please try again."
          );
          setIsLoading(false);
        }
      }, 800); // Simulate network delay
    },
    [router]
  );

  // Function to clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  }, []);

  // Provide the context value
  const contextValue = {
    searchQuery,
    searchResults,
    isLoading,
    error,
    setSearchQuery,
    performSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);
