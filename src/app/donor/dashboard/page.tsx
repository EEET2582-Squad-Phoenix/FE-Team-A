import React from "react";
import ProjectCarousel from "@/components/highlightedProjectCarousel/ProjectCarousel";
import SubcribedProject from "./_component/SubcribedProject";
import Leaderboard from "@/components/leaderboard/Leaderboard";

export default async function Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      {/* Highlighted Projects Carousel */}
      <ProjectCarousel />

      {/* Other Dashboard Content */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Total Donations</h3>
            <p className="text-xl font-bold">$5,000</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Projects Supported</h3>
            <p className="text-xl font-bold">25</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">Monthly Donations</h3>
            <p className="text-xl font-bold">$500</p>
          </div>
        </div>
      </div>

      <SubcribedProject />
      <Leaderboard />
    </div>
  );
}
