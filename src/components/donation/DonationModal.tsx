"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createStripeCheckout, donateAsDonor } from "@/app/api/donate/donateAPI";
import { CreditCardSelector } from "@/app/donor/donation/_components/CreditCardSelector";

type DonationModalProps = {
  donationType: string;
  closeModal: () => void;
  projectName: string;
  projectId: string;
};

const DonationModal = ({
  donationType,
  closeModal,
  projectName,
  projectId,
}: DonationModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonate = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
  
      if (!selectedCard) {
        setError("Please select a credit card.");
        return;
      }
  
      // Call the donate API with all required fields
      const donationResponse = await donateAsDonor({
        amount,
        projectId,
        creditCardId: selectedCard, // Use selected card
        isRecurring: false,
        message,
      });
  
      const donationId = donationResponse.donation.id;
  
      // Call the createStripeCheckout API to initiate payment
      const stripeResponse = await createStripeCheckout({
        amount,
        currency: "USD",
        donationId,
        projectId,
      });
  
      if (stripeResponse.url) {
        window.location.href = stripeResponse.url; // Redirect to Stripe checkout
      } else {
        setError("Failed to initiate the payment process.");
      }
    } catch (err) {
      setError("An error occurred while processing your donation.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h3 className="text-2xl font-semibold mb-4">Make a Donation</h3>
        <p className="text-gray-600 mb-2">Supporting: {projectName}</p>
        <p className="text-gray-600 italic text-sm mb-6">
          "Thank you for choosing us to make a difference! Your generosity
          empowers communities and changes lives."
        </p>
        <CreditCardSelector selectedCard={selectedCard} onSelectCard={setSelectedCard} />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Donation Amount (USD)"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Message (optional)"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-between">
          <Button variant="outline" onClick={closeModal} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleDonate} disabled={isSubmitting || amount <= 0}>
            {isSubmitting ? "Processing..." : `Donate $${amount}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
