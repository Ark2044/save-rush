"use client";
import Categories from "@/components/Categories";
import MakeYourMeal from "@/components/MakeYourMeal";
import HeroBanner from "@/components/HeroBanner";
import PopularProducts from "@/components/PopularProducts";
import QuickDeliveryBanner from "@/components/QuickDeliveryBanner";
import DailyDeals from "@/components/DailyDeals";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import RecentlyViewed from "@/components/RecentlyViewed";
import Testimonials from "@/components/Testimonials";
import EnhancedLoginBanner from "@/components/EnhancedLoginBanner";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedLoginBanner />
      <main>
        <HeroBanner />
        <Categories />
        <PersonalizedRecommendations />
        <DailyDeals />
        <QuickDeliveryBanner />
        <PopularProducts />
        <RecentlyViewed />
        <MakeYourMeal />
        <Testimonials />
        <AppDownloadBanner />
      </main>
    </div>
  );
}
