import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/types/creditCard";
import ConfirmationDialog from "../dialog/ConfirmationDialog";
import EditCreditCardDialog from "./EditCardDialog";

type CreditCardListProps = {
  creditCards: CreditCard[];
  onRemove: (cardId: string) => void;
  onEdit: (
    cardId: string,
    updatedCard: { cardHolder: string; CVV: string; number: string }
  ) => void; // Pass edit handler
};

const CreditCardList = ({
  creditCards,
  onRemove,
  onEdit,
}: CreditCardListProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);

  const handleOpenDeleteDialog = (cardId: string) => {
    setSelectedCardId(cardId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCardId(null);
  };

  const handleOpenEditDialog = (card: CreditCard) => {
    setSelectedCard(card);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedCard(null);
  };

  const handleConfirmDelete = () => {
    if (selectedCardId) {
      onRemove(selectedCardId);
      handleCloseDeleteDialog();
    }
  };

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
              <p className="font-bold text-xl">{card.number}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="text-yellow-400"
                onClick={() => handleOpenEditDialog(card)} 
              >
                <Edit2 className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => handleOpenDeleteDialog(card.cardId)}
              >
                <Trash2 className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        warningText="Are you sure you want to delete this credit card?"
      />

      <EditCreditCardDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        card={selectedCard}
        onEdit={onEdit}
      />
    </div>
  );
};

export default CreditCardList;
