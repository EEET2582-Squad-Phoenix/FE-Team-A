import React from "react";
import { IRecurringDonation } from "@/types/donation";
import RecurringDonationCard from "./RecurringDonationCard";

type RecurringDonationsProps = {
  donations: IRecurringDonation[];
};

export default function RecurringDonations({ donations }: RecurringDonationsProps) {
  const handleEdit = (id: number) => {
    console.log(`Edit donation ${id}`); // Placeholder for edit logic
    alert(`Edit functionality for Donation ID ${id} goes here.`);
  };

  const handleCancel = (id: number) => {
    console.log(`Cancel donation ${id}`); // Placeholder for cancel logic
    alert(`Cancel functionality for Donation ID ${id} goes here.`);
  };

  if (!donations.length) {
    return <p className="text-gray-500">No recurring donations found.</p>;
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <RecurringDonationCard
          key={donation.id}
          donation={donation}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
}
