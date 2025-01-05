import React from "react";

type QuickStatisticsProps = {
  statistics: {
    totalProjects: number;
    totalDonations: number;
    totalDonors: number;
  } | null;
  loading: boolean;
};

const QuickStatistics = ({ statistics, loading }: QuickStatisticsProps) => {
  if (loading) {
    return <p>Loading statistics...</p>;
  }

  if (!statistics) {
    return <p>Failed to load statistics. Please try again later.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Total Projects</h3>
        <p className="text-xl font-bold">{statistics.totalProjects}</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Total Donations</h3>
        <p className="text-xl font-bold">${statistics.totalDonations.toLocaleString()}</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold">Total Donors</h3>
        <p className="text-xl font-bold">{statistics.totalDonors}</p>
      </div>
    </div>
  );
};

export default QuickStatistics;
