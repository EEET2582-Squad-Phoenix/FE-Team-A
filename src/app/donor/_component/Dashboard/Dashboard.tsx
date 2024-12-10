import React from "react";
import DashboardCard from "./DashboardCard";

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Total Donations", value: "$5,000" },
    { title: "Projects Supported", value: "25" },
    { title: "Monthly Donations", value: "$500" },
  ];

  return (
    <div className="p-6 flex-1">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
