"use client";
import { useState, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/CartModal";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();

  // Don't show header and footer on login and OTP verification pages
  const isAuthPage =
    pathname?.includes("/login") || pathname?.includes("/otp-verification");

  return (
    <>
      {!isAuthPage && <Header onOpenCart={() => setCartOpen(true)} />}
      {children}
      {!isAuthPage && <Footer />}
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
