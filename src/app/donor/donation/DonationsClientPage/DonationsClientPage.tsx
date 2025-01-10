"use client";

import React, { useState } from "react";
import DonationHistory from "../_components/DonationHistory"; 

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
      <h1 className="text-3xl font-bold mb-6">Your Donations</h1>

      {/* Donation History Section */}
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
