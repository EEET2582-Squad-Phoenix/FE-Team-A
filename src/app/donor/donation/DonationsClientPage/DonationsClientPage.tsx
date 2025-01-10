"use client";

import React, { useState } from "react";
import DonationHistory from "../_components/DonationHistory"; 
import { HandCoins } from "lucide-react";

export default function DonationsClientPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-6">
      <div className="text-gray-900 mb-10">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <HandCoins className="w-8 h-8" /> 
          Your Donations
        </h1>
        <p className="text-sm text-gray-600">
          View your donation history, mange your recurring subscription.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Donation History</h2>

        <DonationHistory currentPage={currentPage} pageSize={pageSize} />

        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * pageSize >= 100} 
            className={`px-4 py-2 bg-gray-200 rounded ${
              currentPage * pageSize >= 100
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
