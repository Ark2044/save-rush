"use client";
import Categories from "@/components/Categories";
import MakeYourMeal from "@/components/MakeYourMeal";
import HeroBanner from "@/components/HeroBanner";
import DailyDeals from "@/components/DailyDeals";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import PersonalizedRecommendations from "@/components/PersonalizedRecommendations";
import RecentlyViewed from "@/components/RecentlyViewed";
import Testimonials from "@/components/Testimonials";
import EnhancedLoginBanner from "@/components/EnhancedLoginBanner";
import QuickActions from "@/components/QuickActions";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30">
      <EnhancedLoginBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-indigo-600/5 to-purple-800/5"></div>
        <HeroBanner />
      </section>

      {/* Main Content */}
      <main className="relative">
        {/* Categories Section */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <Categories />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <QuickActions />
            </div>
          </div>
        </section>

        {/* Daily Deals */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <DailyDeals />
            </div>
          </div>
        </section>

        {/* Personalized Recommendations */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <PersonalizedRecommendations />
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <RecentlyViewed />
            </div>
          </div>
        </section>

        {/* Make Your Meal */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <MakeYourMeal />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 sm:p-4 md:p-6 lg:p-8">
              <Testimonials />
            </div>
          </div>
        </section>

        {/* App Download */}
        <section className="py-4 sm:py-6 md:py-8 lg:py-12">
          <div className="container-responsive max-w-8xl mx-auto px-3 sm:px-4 md:px-6">
            <AppDownloadBanner />
          </div>
        </section>
      </main>
    </div>
  );
}
