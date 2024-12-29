"use client";

import React, { useState } from "react";
import DonationHistory from "../_components/DonationHistory";
import RecurringDonations from "../_components/RecurringDonations";
import { IDonation, IRecurringDonation } from "@/types/donation";

type DonationsClientPageProps = {
  donations: IDonation[];
  recurringDonations: IRecurringDonation[];
};

export default function DonationsClientPage({
  donations,
  recurringDonations,
}: DonationsClientPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Calculate visible donations
  const startIndex = (currentPage - 1) * pageSize;
  const visibleDonations = donations.slice(startIndex, startIndex + pageSize);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage * pageSize < donations.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Donations</h1>

      {/* Recurring Donations Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Recurring Donations</h2>
        <RecurringDonations donations={recurringDonations} />
      </div>

      {/* Donation History Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Donation History</h2>
        <DonationHistory donations={visibleDonations} />
        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage * pageSize >= donations.length}
            className={`px-4 py-2 bg-gray-200 rounded ${
              currentPage * pageSize >= donations.length
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