import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddCreditCardModal from "./AddCreditCardModal";
import { CreditCard } from "@/types/creditCard";

type AddCreditCardButtonProps = {
  onAdd: (card: CreditCard) => void;
};

const AddCreditCardButton = ({ onAdd }: AddCreditCardButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Add Credit Card
      </Button>
      <AddCreditCardModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={onAdd}
      />
    </>
  );
};

export default AddCreditCardButton;
