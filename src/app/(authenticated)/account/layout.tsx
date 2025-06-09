"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (user && user.displayName) {
      setUserName(user.displayName);
    }
  }, [user]);

  // Define the sidebar links
  const links = [
    { name: "Account Overview", href: "/account", icon: "home" },
    { name: "Orders", href: "/account/orders", icon: "package" },
    { name: "Addresses", href: "/account/addresses", icon: "map-pin" },
    {
      name: "Payment Methods",
      href: "/account/payment-methods",
      icon: "credit-card",
    },
    { name: "Coupons", href: "/account/coupons", icon: "tag" },
  ];

  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return (
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
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "package":
        return (
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
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        );
      case "map-pin":
        return (
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
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "credit-card":
        return (
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
              strokeWidth={1.5}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
      case "tag":
        return (
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
              strokeWidth={1.5}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-6 mb-20">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar for larger screens */}
        <div className="hidden md:block">
          <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">{userName}</h2>
                <p className="text-sm text-gray-500">
                  {user?.phoneNumber || user?.email}
                </p>
              </div>
            </div>
            <Link
              href="/account/edit"
              className="text-sm text-[#6B46C1] hover:underline"
            >
              Edit Profile
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (pathname && pathname.startsWith(`${link.href}/`));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 p-4 transition-colors ${
                      isActive
                        ? "bg-[#F0EAFA] text-[#6B46C1] border-l-4 border-[#6B46C1]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={isActive ? "text-[#6B46C1]" : "text-gray-500"}
                    >
                      {renderIcon(link.icon)}
                    </span>
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab navigation for mobile screens */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 pb-2 border-b mb-6">
            {links.map((link) => {
              const isActive =
                pathname === link.href || pathname?.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap pb-2 ${
                    isActive
                      ? "text-[#6B46C1] border-b-2 border-[#6B46C1] font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
