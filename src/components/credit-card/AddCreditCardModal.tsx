import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/types/creditCard";
import { addCreditCard } from "@/app/api/donate/donateAPI";
import { toast } from "sonner";  // Importing Sonner's toast function

type AddCreditCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (card: CreditCard) => void;
};

const AddCreditCardModal = ({ isOpen, onClose, onAdd }: AddCreditCardModalProps) => {
  const [cardHolder, setCardHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newCard = await addCreditCard({ cardHolder, number, expiryDate, CVV: cvv });
      onAdd(newCard);  // Update parent with the new card
      onClose();  // Close the modal
      toast.success("Credit card added successfully!");  // Show success toast
    } catch (err) {
      toast.error("Failed to add credit card. Please try again.");  // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {/* Add the DialogTitle here to ensure screen reader accessibility */}
          <DialogTitle>Add Credit Card</DialogTitle>
        </DialogHeader>

        <div>
          <label className="block mb-2">Card Holder</label>
          <Input
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Enter cardholder's name"
          />
          <label className="block mt-4 mb-2">Card Number</label>
          <Input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter card number"
          />
          <label className="block mt-4 mb-2">Expiry Date</label>
          <Input
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
          <label className="block mt-4 mb-2">CVV</label>
          <Input
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            placeholder="Enter CVV"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Card"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditCardModal;
