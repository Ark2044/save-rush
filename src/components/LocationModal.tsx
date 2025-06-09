"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useLocation, Location } from "@/context/LocationContext";

// Map container styles
const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

// Service area radius in kilometers (approximately 5km)
const SERVICE_AREA_RADIUS = 5;

// Google Maps libraries to load
const libraries: "places"[] = ["places"];

// Calculate distance between two points (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

export default function LocationModal() {
  const {
    isLocationModalOpen,
    closeLocationModal,
    saveLocation,
    currentLocation,
  } = useLocation();
  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [center, setCenter] = useState({
    lat: currentLocation?.lat || 18.9219, // Default to Mumbai's Gateway of India
    lng: currentLocation?.lng || 72.8346,
  });
  const [markerPosition, setMarkerPosition] = useState(center);
  const [isLoading, setIsLoading] = useState(false);
  const [isInServiceArea, setIsInServiceArea] = useState(true);
  const [recentLocations, setRecentLocations] = useState<Location[]>([]);
  const [suggestedAddresses, setSuggestedAddresses] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Initialize with current location if available
  useEffect(() => {
    if (currentLocation) {
      setCenter({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
      setMarkerPosition({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
      setAddress(currentLocation.address);
      setFullAddress(currentLocation.fullAddress);

      // Check if in service area
      const storeLocation = { lat: 18.9219, lng: 72.8346 }; // Gateway of India as store location
      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        storeLocation.lat,
        storeLocation.lng
      );
      setIsInServiceArea(distance <= SERVICE_AREA_RADIUS);
    }

    // Load recent locations from localStorage
    const recentLocationsStr = localStorage.getItem("saveRushRecentLocations");
    if (recentLocationsStr) {
      try {
        const locations = JSON.parse(recentLocationsStr);
        setRecentLocations(locations);
      } catch (error) {
        console.error("Failed to parse recent locations:", error);
      }
    }
  }, [currentLocation]);
  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          setMarkerPosition(pos);

          // Check if in service area
          const storeLocation = { lat: 18.9219, lng: 72.8346 }; // Gateway of India as store location
          const distance = calculateDistance(
            pos.lat,
            pos.lng,
            storeLocation.lat,
            storeLocation.lng
          );
          setIsInServiceArea(distance <= SERVICE_AREA_RADIUS);

          // Reverse geocode to get address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK" && results && results[0]) {
              setAddress(results[0].formatted_address.split(",")[0]);
              setFullAddress(results[0].formatted_address);
            }
            setIsLoading(false);
          });
        },
        () => {
          alert(
            "Error: Could not get your location. Please allow location access."
          );
          setIsLoading(false);
        }
      );
    } else {
      alert("Error: Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };
  // Handle map click to set marker
  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });

      // Check if in service area
      const storeLocation = { lat: 18.9219, lng: 72.8346 }; // Gateway of India as store location
      const distance = calculateDistance(
        lat,
        lng,
        storeLocation.lat,
        storeLocation.lng
      );
      setIsInServiceArea(distance <= SERVICE_AREA_RADIUS);

      // Reverse geocode to get address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setAddress(results[0].formatted_address.split(",")[0]);
          setFullAddress(results[0].formatted_address);
        }
      });
    }
  }, []);
  // Handle places changed in search box
  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry?.location) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setCenter({ lat: newLat, lng: newLng });
        setMarkerPosition({ lat: newLat, lng: newLng });

        // Check if in service area
        const storeLocation = { lat: 18.9219, lng: 72.8346 }; // Gateway of India as store location
        const distance = calculateDistance(
          newLat,
          newLng,
          storeLocation.lat,
          storeLocation.lng
        );
        setIsInServiceArea(distance <= SERVICE_AREA_RADIUS);

        if (place.formatted_address) {
          setAddress(place.name || place.formatted_address.split(",")[0]);
          setFullAddress(place.formatted_address);
        }

        // Pan to the selected location
        if (mapRef.current) {
          mapRef.current.panTo({ lat: newLat, lng: newLng });
        }
      }
    }
  };

  // Handle map load
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // Handle search box load
  const onSearchBoxLoad = (searchBox: google.maps.places.SearchBox) => {
    searchBoxRef.current = searchBox;
  };
  // Save the selected location
  const handleSaveLocation = () => {
    const newLocation: Location = {
      address,
      fullAddress,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    };

    // Save to recent locations (max 3)
    const updatedRecentLocations = [newLocation];

    // Add existing locations that are different from the current one
    if (recentLocations.length > 0) {
      recentLocations.forEach((loc) => {
        if (
          loc.fullAddress !== newLocation.fullAddress &&
          updatedRecentLocations.length < 3
        ) {
          updatedRecentLocations.push(loc);
        }
      });
    }

    localStorage.setItem(
      "saveRushRecentLocations",
      JSON.stringify(updatedRecentLocations)
    );
    saveLocation(newLocation);
  };

  // Use a recent location
  const useRecentLocation = (location: Location) => {
    setCenter({
      lat: location.lat,
      lng: location.lng,
    });
    setMarkerPosition({
      lat: location.lat,
      lng: location.lng,
    });
    setAddress(location.address);
    setFullAddress(location.fullAddress);

    // Check if in service area
    const storeLocation = { lat: 18.9219, lng: 72.8346 }; // Gateway of India as store location
    const distance = calculateDistance(
      location.lat,
      location.lng,
      storeLocation.lat,
      storeLocation.lng
    );
    setIsInServiceArea(distance <= SERVICE_AREA_RADIUS);
  };

  if (!isLocationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Select your location
            </h2>
            <button
              onClick={closeLocationModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="flex items-center gap-2 text-[#6B46C1] font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {isLoading ? "Getting your location..." : "Use current location"}
            </button>
          </div>{" "}
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            libraries={libraries}
          >
            <div className="mb-4">
              <StandaloneSearchBox
                onLoad={onSearchBoxLoad}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search for an area, street name..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                />
              </StandaloneSearchBox>
            </div>

            {recentLocations.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Recent Locations
                </h3>
                <div className="space-y-2">
                  {recentLocations.map((location, index) => (
                    <div
                      key={index}
                      onClick={() => useRecentLocation(location)}
                      className="flex items-start gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">
                          {location.address}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {location.fullAddress}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              onClick={onMapClick}
              onLoad={onMapLoad}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </LoadScript>{" "}
          {fullAddress && (
            <div className="mt-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">{fullAddress}</p>
              </div>
            </div>
          )}{" "}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={closeLocationModal}
              className="px-4 py-2 text-[#6B46C1] hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveLocation}
              disabled={!fullAddress}
              className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg hover:bg-[#5A3AA8] disabled:opacity-50"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
