"use client";

import React, { useEffect, useState } from "react";
import {
  fetchDonationValue,
  fetchProjectCount,
} from "@/app/api/charities/charitiesAPI";
import { useUserStore } from "@/store/user-store";
import LucideIcon from "../lucide-icon";

const QuickStatistics = () => {
  const { currentUser } = useUserStore();
  const [statistics, setStatistics] = useState<{
    totalProjects: number;
    totalDonations: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchStatistics = async () => {
      try {
        setLoading(true);

        const [totalDonations, totalProjects] = await Promise.all([
          fetchDonationValue(currentUser.id, currentUser.role === "DONOR"),
          fetchProjectCount(currentUser.id, currentUser.role === "DONOR"),
        ]);

        setStatistics({ totalProjects, totalDonations });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setStatistics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <p className="text-lg font-medium text-gray-500">
          Loading your statistics...
        </p>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center mt-4">
        <p className="text-lg font-medium text-red-500">
          Failed to load statistics. Please try again later.
        </p>
      </div>
    );
  }

  // Determine labels based on user role
  const totalProjectsLabel =
    currentUser?.role === "CHARITY"
      ? "Total Projects Owned"
      : "Total Projects Donated To";
  const totalDonationsLabel =
    currentUser?.role === "CHARITY"
      ? "Total Donations Received"
      : "Total Donations Made";

  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-lg">
      <header className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800">Your Statistics</h2>
        <p className="text-gray-600">
          A quick overview of your contribution and projects
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md border-t-4 border-green-400">
          <LucideIcon name="Layers" className="text-green-500 w-8 h-8 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {totalProjectsLabel}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {statistics.totalProjects}
            </p>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-400">
          <LucideIcon
            name="DollarSign"
            className="text-blue-500 w-8 h-8 mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {totalDonationsLabel}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              ${statistics.totalDonations.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatistics;
