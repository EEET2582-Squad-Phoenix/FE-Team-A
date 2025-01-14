import React, { useEffect, useState } from "react";
import DonationCard from "@/components/donation/DonationCard";
import { IDonation } from "@/types/donation";
import { fetchDonations } from "@/app/api/donors/donorsAPI";
import { fetchDonationsByCharity } from "@/app/api/charities/charitiesAPI";

interface DonationHistoryProps {
  currentPage: number;
  pageSize: number;
}

const DonationHistory: React.FC<DonationHistoryProps> = ({
  currentPage,
  pageSize,
}) => {
  const [donations, setDonations] = useState<IDonation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDonations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDonationsByCharity();
        setDonations(data);
      } catch (err) {
        setError("Failed to fetch donations.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDonations();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const visibleDonations = donations.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="space-y-4">
            {visibleDonations.length > 0 ? (
              visibleDonations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  allowDetailsOpen={true}
                />
              ))
            ) : (
              <p className="text-gray-500">No donations found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DonationHistory;
