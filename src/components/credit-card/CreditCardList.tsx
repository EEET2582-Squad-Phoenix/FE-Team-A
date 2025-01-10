import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/types/creditCard";
import ConfirmationDialog from "../dialog/ConfirmationDialog";


type CreditCardListProps = {
  creditCards: CreditCard[];
  onRemove: (cardId: string) => void;
};

const CreditCardList = ({ creditCards, onRemove }: CreditCardListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleOpenDialog = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCardId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedCardId) {
      onRemove(selectedCardId);
      setIsDialogOpen(false);
      setSelectedCardId(null);
    }
  };

  const maskCardNumber = (number: string) =>
    "**** **** **** " + number.slice(-4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {creditCards.map((card) => (
        <div
          key={card.cardId}
          className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 shadow-md transform transition hover:scale-105 hover:shadow-lg"
        >
          <div className="mb-4">
            <p className="font-light text-sm">Card Holder</p>
            <p className="font-bold text-lg">{card.cardHolder}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-light text-sm">Card Number</p>
              <p className="font-bold text-xl">{maskCardNumber(card.number)}</p>
            </div>
            <Button
              variant="ghost"
              className="text-red-500"
              onClick={() => handleOpenDialog(card.cardId)}
            >
              <Trash2 className="w-6 h-6" />
            </Button>
          </div>
        </div>
      ))}

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        warningText="Are you sure you want to delete this credit card?"
      />
    </div>
  );
};

export default CreditCardList;
