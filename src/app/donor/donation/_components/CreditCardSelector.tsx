"use client";

import React, { useEffect, useState } from "react";
import { fetchCreditCards } from "@/app/api/donate/donateAPI";
import { CreditCard } from "@/types/creditCard";

type CreditCardSelectorProps = {
  selectedCard: string | null;
  onSelectCard: (cardId: string) => void;
};

export const CreditCardSelector: React.FC<CreditCardSelectorProps> = ({
  selectedCard,
  onSelectCard,
}) => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      try {
        const creditCards = await fetchCreditCards();
        setCards(creditCards);
        if (creditCards.length > 0 && !selectedCard) {
          onSelectCard(creditCards[0].cardId); 
        }
      } catch (err) {
        setError("Failed to fetch credit cards.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, [onSelectCard, selectedCard]);

  if (isLoading) return <p>Loading cards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mb-4">
      <label htmlFor="credit-card" className="block text-sm font-medium text-gray-700">
        Select Credit Card
      </label>
      <select
        id="credit-card"
        value={selectedCard || ""}
        onChange={(e) => onSelectCard(e.target.value)}
        className="w-full p-3 border rounded-lg mt-2"
      >
        {cards.map((card) => (
          <option key={card.cardId} value={card.cardId}>
            {`${card.number} - ${card.cardHolder}`}
          </option>
        ))}
      </select>
    </div>
  );
};
