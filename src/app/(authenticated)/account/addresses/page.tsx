"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { addressService } from "@/services";
import { useAuth } from "@/context/AuthContext";

interface Address {
  id: string;
  type: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function Addresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "Home",
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  });

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const fetchedAddresses = await addressService.getAddresses();
      setAddresses(fetchedAddresses || []);
    } catch (error) {
      toast.error("Failed to load addresses.");
      console.error("Fetch addresses error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate pincode
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    // Validate other required fields
    if (
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const loadingToast = toast.loading("Adding address...");
    try {
      await addressService.addAddress({
        ...formData,
        isDefault: addresses.length === 0,
      });
      setShowAddForm(false);
      toast.dismiss(loadingToast);
      toast.success("New address added successfully");
      fetchAddresses(); // Refresh the list
      setFormData({
        type: "Home",
        address: "",
        locality: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to add address.");
    }
  };

  const setAsDefault = async (id: string) => {
    const loadingToast = toast.loading("Setting default address...");
    try {
      await addressService.setDefaultAddress(id);
      toast.dismiss(loadingToast);
      toast.success("Default address updated");
      fetchAddresses(); // Refresh the list
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to update default address.");
    }
  };

  const deleteAddress = async (id: string) => {
    // Don't allow deletion of the default address
    const addressToDelete = addresses.find((addr) => addr.id === id);
    if (addressToDelete?.isDefault) {
      toast.error(
        "Cannot delete default address. Set another address as default first."
      );
      return;
    }

    if (window.confirm("Are you sure you want to delete this address?")) {
      const loadingToast = toast.loading("Deleting address...");
      try {
        await addressService.deleteAddress(id);
        toast.dismiss(loadingToast);
        toast.success("Address deleted successfully");
        fetchAddresses(); // Refresh the list
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Failed to delete address.");
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6 mb-20">
      <div className="flex items-center mb-6">
        <Link href="/account" className="text-[#6B46C1] mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">Manage Addresses</h1>
      </div>

      <div className="space-y-4">
        {/* Add New Address Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-[#6B46C1]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Address
          </button>
        )}

        {/* Add Address Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h2 className="text-lg font-medium mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter 6-digit pincode"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Flat / House No. / Floor / Building"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Locality
                    </label>
                    <input
                      type="text"
                      name="locality"
                      value={formData.locality}
                      onChange={handleChange}
                      placeholder="Colony, Area, Street"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6B46C1]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-[#6B46C1] border border-[#6B46C1] rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#6B46C1] text-white rounded-lg"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Existing Addresses */}
        {loading ? (
          <p>Loading addresses...</p>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg shadow-sm p-5 border"
            >
              <div className="flex justify-between">
                <div className="flex items-center mb-2">
                  <span className="font-medium mr-2">{address.type}</span>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {!address.isDefault && (
                    <button
                      onClick={() => setAsDefault(address.id)}
                      className="text-sm text-gray-600 hover:text-[#6B46C1]"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700">
                {address.address}, {address.locality}
              </p>
              <p className="text-gray-700">
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
