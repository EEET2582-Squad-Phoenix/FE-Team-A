"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface DonationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  donorId: string;
}

interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  introVidUrl: string;
  address: string | null;
  language: string;
  monthlyDonation: number;
}

const DonationDetails: React.FC<DonationDetailsProps> = ({ isOpen, onClose, donorId }) => {
  const [donor, setDonor] = useState<Donor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && donorId) {
      fetchDonorDetails(donorId);
    }
  }, [isOpen, donorId]);

  const fetchDonorDetails = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/donor/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch donor details.");
      }

      const data = await response.json();
      setDonor(data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 space-y-6 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Donor Details</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center items-center">
            <Spinner className="w-6 h-6 text-indigo-600" />
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && donor && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <img
                src={donor.avatarUrl}
                alt={`${donor.firstName} ${donor.lastName}`}
                className="w-24 h-24 rounded-full shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {donor.firstName} {donor.lastName}
              </h2>
              <p className="text-gray-600">{donor.address || "No address provided"}</p>
            </div>

            {donor.introVidUrl && (
              <div className="flex justify-center">
                <video
                  controls
                  src={donor.introVidUrl}
                  className="rounded-md shadow-lg w-full max-w-sm"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <div className="bg-indigo-50 p-3 rounded-md shadow-md">
              <p className="text-sm text-gray-500">Monthly Donation</p>
              <p className="text-lg font-bold text-indigo-600">
                ${donor.monthlyDonation.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button id="donationDetailsCloseButton" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDetails;
