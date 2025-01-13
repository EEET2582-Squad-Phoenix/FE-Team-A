"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { donateAsGuest } from "@/app/api/donate/donateAPI";

type DonationModalProps = {
  donationType: string;
  closeModal: () => void;
  projectName: string;
  projectId: string;
};

const GuestDonationModal = ({
  donationType,
  closeModal,
  projectName,
  projectId,
}: DonationModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonate = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (amount <= 0 || !name || !email || !phone || !address) {
        setError("Please fill out all required fields.");
        return;
      }

       await donateAsGuest({
        amount,
        projectId,
        email,
        name,
        message,
        phone,
        address,
      });

      
      alert(`Donation successful! Thank you for supporting ${projectName}.`);
      closeModal();
    } catch (err: any) {
      setError("An error occurred while processing your donation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h3 className="text-2xl font-semibold mb-4">Make a Donation</h3>
        <p className="text-gray-600 mb-2">Supporting: {projectName}</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Donation Amount (USD)"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Email"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Address"
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
          <Button
            variant="default"
            onClick={handleDonate}
            disabled={isSubmitting || amount <= 0}
          >
            {isSubmitting ? "Processing..." : `Donate $${amount}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestDonationModal;
