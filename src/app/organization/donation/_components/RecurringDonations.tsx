import React, { useState, useEffect } from "react";
import { IRecurringDonation } from "@/types/donation";
import RecurringSubscriptionCard from "./RecurringSubscriptionCard";
import {
  fetchRecurringDonations,
  cancelRecurringDonation,
} from "@/app/api/donors/donorsAPI";
import { toast } from "sonner";
import ConfirmationDialog from "@/components/dialog/ConfirmationDialog";
import { Button } from "@/components/ui/button";

export default function RecurringDonations() {
  const [donations, setDonations] = useState<IRecurringDonation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDonationId, setCurrentDonationId] = useState<string | null>(
    null
  );

  const loadRecurringDonations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRecurringDonations();
      setDonations(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load recurring donations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecurringDonations();
  }, []);

  const openConfirmationDialog = (donationId: string) => {
    setCurrentDonationId(donationId);
    setIsDialogOpen(true);
  };

  const handleCancelDonation = async () => {
    if (!currentDonationId) return;
    try {
      await cancelRecurringDonation(currentDonationId);
      setDonations(
        donations.filter((donation) => donation.id !== currentDonationId)
      );
      toast.success("Subscription canceled successfully.");
    } catch (error) {
      console.error("Error canceling donation:", error);
      toast.error("Failed to cancel subscription.");
    } finally {
      setIsDialogOpen(false);
      setCurrentDonationId(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-red-600">
        <p>{error}</p>
        <Button variant="outline" onClick={loadRecurringDonations}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Recurring Donations</h2>
      {donations.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">You have no recurring donations.</p>
          <p className="text-sm">
            Consider starting one to support a project you care about!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <RecurringSubscriptionCard
              key={donation.id}
              id={donation.id}
              projectName={donation.projectName}
              amount={donation.amount}
              message={donation.message || "No message"}
              nextBillingDate={donation.nextBillingDate}
              status={donation.status}
              onCancel={() => openConfirmationDialog(donation.id)}
            />
          ))}
        </div>
      )}

      {currentDonationId && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleCancelDonation}
          title="Cancel Subscription"
          warningText="Are you sure you want to cancel this recurring donation?"
        />
      )}
    </div>
  );
}
