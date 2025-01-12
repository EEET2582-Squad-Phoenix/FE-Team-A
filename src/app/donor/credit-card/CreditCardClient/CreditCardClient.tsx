"use client";

import React, { useState, useEffect } from "react";
import { deleteCreditCard, fetchCreditCards, updateCreditCard } from "@/app/api/donate/donateAPI";
import CreditCardList from "@/components/credit-card/CreditCardList";
import AddCreditCardButton from "@/components/credit-card/AddCreditCardButton";
import { CreditCard } from "@/types/creditCard";
import { toast } from "sonner";
import { CreditCard as CreditCardIcon } from "lucide-react";

const CreditCardClient = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCreditCards = async () => {
    try {
      setLoading(true);
      const cards = await fetchCreditCards();
      setCreditCards(cards);
    } catch (err) {
      setError("Failed to fetch credit cards. Please try again later.");
      toast.error("Failed to fetch credit cards. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCreditCard = async (cardId: string) => {
    try {
      await deleteCreditCard(cardId);
      loadCreditCards();
      toast.success("Credit card removed successfully!");
    } catch (err) {
      toast.error("Failed to delete credit card. Please try again.");
    }
  };

  const handleEditCreditCard = async (cardId: string, updatedCard: { cardHolder: string; CVV: string; number: string }) => {
    try {
      await updateCreditCard(cardId, updatedCard);  
      loadCreditCards();  
      toast.success("Credit card updated successfully!");
    } catch (err) {
      toast.error("Failed to update credit card. Please try again.");
    }
  };

  useEffect(() => {
    loadCreditCards();  
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="text-gray-900 mb-10">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <CreditCardIcon className="w-8 h-8" />
          Manage Credit Cards
        </h1>
        <p className="text-sm text-gray-600">
          Add, view, and manage all your payment cards in one place.
        </p>
      </div>

      <div className="mb-6">
        <AddCreditCardButton onAdd={loadCreditCards} isCharity={true} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 animate-pulse rounded-lg shadow-md"
            ></div>
          ))}
        </div>
      ) : creditCards.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No credit cards found. Please add a card to start receiving donations!</p>
        </div>
      ) : (
        <CreditCardList
          creditCards={creditCards}
          onRemove={handleDeleteCreditCard}
          onEdit={handleEditCreditCard} 
        />
      )}
    </div>
  );
};

export default CreditCardClient;
