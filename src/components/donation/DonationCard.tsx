import React from "react";
import { IDonation, IRecurringDonation } from "@/types/donation";

type DonationCardProps = {
  donation: IDonation | IRecurringDonation; // Supports both types
  isRecurring?: boolean; // Optional flag for recurring donations
};

export default function DonationCard({ donation, isRecurring = false }: DonationCardProps) {
  const subtitle = isRecurring
    ? `Next Payment: ${(donation as IRecurringDonation).nextDate}`
    : `Date: ${(donation as IDonation).date}`;
  const amountSuffix = isRecurring ? "/ month" : "";

  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h3 className="text-lg font-semibold">{donation.projectName}</h3>
        <p className="text-gray-600">{subtitle}</p>
        {"message" in donation && donation.message && (
          <p className="italic text-gray-500 mt-1">
            Message: {donation.message}
          </p>
        )}
      </div>
      <div className="text-xl font-bold">
        <span className="text-green-500">{`$${donation.amount.toFixed(2)}`}</span>
        <span className="text-sm text-gray-500">{` ${amountSuffix}`}</span>
      </div>
    </div>
  );
}
