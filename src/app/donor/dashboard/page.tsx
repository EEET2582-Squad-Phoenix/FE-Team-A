import React from "react";
import HighlightedProjectCarousel from "@/components/carousel/Carousel";
import RecommendedProject from "./_component/RecommendedProject";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import Shortcuts from "@/components/shortcuts/Shortcuts";
import { Home } from "lucide-react";
import QuickStatistics from "@/components/statistic/QuickStatistics";

export default async function Page() {
  return (
    <div className="p-6">
      <div className="text-gray-900 mb-10">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <Home className="w-8 h-8" />
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-600">
          Track your donations, supported projects, and manage all your
          interactions in one place.
        </p>
      </div>

      <HighlightedProjectCarousel />

      <div className="mt-8">
        <Shortcuts userRole="donor" />
      </div>

      <QuickStatistics />
      <RecommendedProject />
      <Leaderboard />
    </div>
  );
}
