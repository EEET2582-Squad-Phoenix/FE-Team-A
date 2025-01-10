"use client";

import React, { useEffect, useState } from "react";
import { fetchTopDonors } from "@/app/api/ranking/rankingAPI";
import { DonorRankingResponse } from "@/types/statistic";

const DonorLeaderboard = () => {
  const [donors, setDonors] = useState<DonorRankingResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDonors = async () => {
      setLoading(true);
      try {
        const data = await fetchTopDonors();
        setDonors(data);
      } catch (err) {
        setError("Failed to fetch donors.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDonors();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700">
        🌟 Top Individual Donors
      </h3>
      {loading ? (
        <p className="text-gray-500">Loading donors...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : donors.length === 0 ? (
        <p className="text-gray-500">No donor data available.</p>
      ) : (
        <ul className="space-y-4">
          {donors.map((donor, index) => (
            <li
              key={`${donor.firstName}-${donor.lastName}-${index}`}
              className={`flex items-center justify-between p-4 rounded-lg ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                : index === 1
                ? "bg-gradient-to-r from-slate-300 to-slate-500 text-white"
                : index === 2
                ? "bg-gradient-to-r from-orange-600 to-amber-800 text-white"
                : "bg-sky-500"
              }`}
            >
              <div className="flex items-center">
              <span className="text-lg font-medium mr-5">
                  #{index+1}
                </span>
                <img
                  src={donor.avatar || "/gura.jpg"}
                  alt={'N/A'}
                  className="w-12 h-12 object-cover rounded-full border-2 border-indigo-700 mr-4"
                />
                <span className="text-lg font-medium">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                  {`${donor.firstName} ${donor.lastName}`}
                </span>
              </div>
              <span className="text-lg font-bold">
                ${donor.totalDonation.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonorLeaderboard;
