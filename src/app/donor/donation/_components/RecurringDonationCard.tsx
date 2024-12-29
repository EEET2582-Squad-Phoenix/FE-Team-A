import React from "react";
import { IRecurringDonation } from "@/types/donation";
import { Button } from "@/components/ui/button";

type RecurringDonationCardProps = {
  donation: IRecurringDonation;
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
};

export default function RecurringDonationCard({
  donation,
  onEdit,
  onCancel,
}: RecurringDonationCardProps) {
  return (
    <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{donation.projectName}</h3>
        <p className="text-gray-600">Next Payment: {donation.nextDate}</p>
        <div className="text-blue-500 text-lg font-bold mt-1">
          ${donation.amount.toFixed(2)} / month
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onEdit(donation.id)}
          className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300"
        >
          Edit
        </Button>
        <Button
          onClick={() => onCancel(donation.id)}
          className="px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
