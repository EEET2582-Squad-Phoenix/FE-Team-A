"use client";

import React, { useState, useEffect } from "react";
import HighlightedProjectCarousel from "@/components/carousel/Carousel";
import QuickStatistics from "@/components/statistic/QuickStatistics";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import Shortcuts from "@/components/shortcuts/Shortcuts";
import { fetchCharityStatistics } from "@/app/api/ranking/rankingAPI";
import { CharityStatistics } from "@/types/statistic";
import { Home } from "lucide-react";

const DashboardClient = () => {
  const [statistics, setStatistics] = useState<CharityStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const stats = await fetchCharityStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    getStatistics();
  }, []);

  return (
    <div className="p-6">
    <div className="text-gray-900 mb-10">
       <h1 className="text-3xl font-semibold flex items-center gap-4">
         <Home className="w-8 h-8" />
         Dashboard Overview
       </h1>
       <p className="text-sm text-gray-600">
         Track your donations, supported projects, and manage all your interactions in one place.
       </p>
     </div>

      <HighlightedProjectCarousel />

      <div className="mt-8">
        <Shortcuts userRole="organization" />
      </div>

      {/* Quick Statistics */}
      {/* <div className="mt-8">
        <QuickStatistics statistics={statistics} loading={loading} />
      </div> */}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Total Projects</h3>
            <p className="text-xl font-bold">200</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Total Donations</h3>
            <p className="text-xl font-bold">25</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Money Raised</h3>
            <p className="text-xl font-bold">$500</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Leaderboard />
      </div>
    </div>
  );
};

export default DashboardClient;
