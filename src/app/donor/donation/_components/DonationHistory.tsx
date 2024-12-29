import React from "react";
import DonationCard from "@/components/donation/DonationCard";
import { IDonation } from "@/types/donation";

type DonationHistoryProps = {
  donations: IDonation[];
};

export default function DonationHistory({ donations }: DonationHistoryProps) {
  if (!donations.length) {
    return <p className="text-gray-500">No donations found.</p>;
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <DonationCard key={donation.id} donation={donation} />
      ))}
    </div>
  );
}
