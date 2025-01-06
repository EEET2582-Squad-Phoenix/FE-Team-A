"use client";

import React from "react";
import DonorLeaderboard from "./DonorLeaderboard";
import CharityLeaderboard from "./CharityLeaderboard";

const Leaderboard = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-2xl">
      <h2 className="text-4xl font-extrabold mb-8 text-center">
        🎉 Monthly Donation Leaderboard 🎉
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <DonorLeaderboard />
        <CharityLeaderboard />
      </div>
    </div>
  );
};

export default Leaderboard;
