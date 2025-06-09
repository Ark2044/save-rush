"use client";
import Categories from "@/components/Categories";
import MakeYourMeal from "@/components/MakeYourMeal";
import HeroBanner from "@/components/HeroBanner";
import PopularProducts from "@/components/PopularProducts";
import QuickDeliveryBanner from "@/components/QuickDeliveryBanner";
import DailyDeals from "@/components/DailyDeals";
import AppDownloadBanner from "@/components/AppDownloadBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroBanner />
        <Categories />
        <DailyDeals />
        <PopularProducts />
        <QuickDeliveryBanner />
        <MakeYourMeal />
        <AppDownloadBanner />
      </main>
    </div>
  );
}
