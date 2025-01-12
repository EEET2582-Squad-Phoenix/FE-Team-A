import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddCreditCardModal from "./AddCreditCardModal";
import { Plus } from "lucide-react";

type AddCreditCardButtonProps = {
  onAdd: () => void;
  isCharity: boolean;  
};

const AddCreditCardButton = ({ onAdd, isCharity }: AddCreditCardButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md flex items-center gap-2 px-4 py-2 hover:from-green-500 hover:to-green-700"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-5 h-5" />
        Add Credit Card
      </Button>
      <AddCreditCardModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={onAdd}
        isCharity={isCharity}  
      />
    </>
  );
};

export default AddCreditCardButton;
