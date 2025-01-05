"use client";

import React, { useState, useEffect } from "react";
import ProjectCarousel from "@/components/carousel/Carousel";
import QuickStatistics from "@/components/statistic/QuickStatistics";
import Leaderboard from "@/components/leaderboard/Leaderboard"; 
import Shortcuts from "@/components/shortcuts/Shortcuts";
import { fetchCharityStatistics } from "@/app/api/statistics/statisticsAPI";
import { CharityStatistics } from "@/types/statistic";

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
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <ProjectCarousel />

      <div className="mt-8">
        <Shortcuts userRole="organization"/>
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
