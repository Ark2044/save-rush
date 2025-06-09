"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

// Types
export interface Location {
  address: string;
  fullAddress: string;
  lat: number;
  lng: number;
}

interface LocationContextType {
  currentLocation: Location | null;
  isLocationModalOpen: boolean;
  saveLocation: (location: Location) => void;
  openLocationModal: () => void;
  closeLocationModal: () => void;
}

// Default location for Mumbai - Gateway of India
const DEFAULT_LOCATION: Location = {
  address: "Gateway of India",
  fullAddress:
    "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
  lat: 18.9219,
  lng: 72.8346,
};

// Create Context
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

// Provider Component
export function LocationProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Load location from localStorage on initial render
  useEffect(() => {
    const savedLocation = localStorage.getItem("saveRushLocation");
    if (savedLocation) {
      setCurrentLocation(JSON.parse(savedLocation));
    } else {
      // Set default location if none exists
      setCurrentLocation(DEFAULT_LOCATION);
      localStorage.setItem(
        "saveRushLocation",
        JSON.stringify(DEFAULT_LOCATION)
      );
    }
  }, []);

  const saveLocation = (location: Location) => {
    setCurrentLocation(location);
    localStorage.setItem("saveRushLocation", JSON.stringify(location));
    setIsLocationModalOpen(false);
    toast.success(`Delivery location set to ${location.address}`);
  };

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const value = {
    currentLocation,
    isLocationModalOpen,
    saveLocation,
    openLocationModal,
    closeLocationModal,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

// Hook for using the context
export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
