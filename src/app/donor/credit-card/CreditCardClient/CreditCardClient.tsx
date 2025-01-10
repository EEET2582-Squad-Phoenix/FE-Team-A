"use client"

import React, { useState, useEffect } from "react";
import { fetchCreditCards, deleteCreditCard } from "@/app/api/donate/donateAPI"; 
import CreditCardList from "@/components/credit-card/CreditCardList";
import AddCreditCardButton from "@/components/credit-card/AddCreditCardButton";
import { CreditCard } from "@/types/creditCard";
import { toast } from "sonner"; 

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

  useEffect(() => {
    loadCreditCards();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Credit Cards</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <div className="mb-6">
        <AddCreditCardButton onAdd={() => loadCreditCards()} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CreditCardList
          creditCards={creditCards}
          onRemove={handleDeleteCreditCard} 
        />
      )}
    </div>
  );
};

export default CreditCardClient;
