"use client";

import React, { useEffect, useState } from "react";
import { fetchTopCharities } from "@/app/api/ranking/rankingAPI";
import { CharityRankingResponse } from "@/types/statistic";

const CharityLeaderboard = () => {
  const [charities, setCharities] = useState<CharityRankingResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharities = async () => {
      setLoading(true);
      try {
        const data = await fetchTopCharities();
        setCharities(data);
      } catch (err) {
        setError("Failed to fetch charities.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCharities();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700">
        🌟 Top Charity Organizations
      </h3>
      {loading ? (
        <p className="text-gray-500">Loading charities...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : charities.length === 0 ? (
        <p className="text-gray-500">No charity data available.</p>
      ) : (
        <ul className="space-y-4">
          {charities.map((charity, index) => (
            <li
              key={`${charity.name}-${index}`}
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
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : ""}
                <span className="text-lg font-medium">{charity.name}</span>
              </div>
              <span className="text-lg font-bold">
                ${charity.totalDonation.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CharityLeaderboard;
