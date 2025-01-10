import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/types/creditCard";
import { deleteCreditCard } from "@/app/api/donate/donateAPI";

type CreditCardListProps = {
  creditCards: CreditCard[];
  onRemove: (cardId: string) => void;
};

const CreditCardList = ({ creditCards, onRemove }: CreditCardListProps) => {
  const maskCardNumber = (number: string) =>
    "**** **** **** " + number.slice(-4);

  const handleRemove = async (cardId: string) => {
    try {
      await deleteCreditCard(cardId);
      onRemove(cardId);
    } catch (err) {
      alert("Failed to remove credit card.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {creditCards.map((card) => (
        <div
          key={card.cardId}
          className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{card.cardHolder}</p>
            <p className="text-lg font-semibold">
              {maskCardNumber(card.number)}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleRemove(card.cardId)}
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CreditCardList;
