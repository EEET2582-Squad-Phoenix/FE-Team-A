"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CreditCard } from "@/types/creditCard";
import { addCardSchema, AddCard } from "@/schema";
import { updateCreditCard } from "@/app/api/donate/donateAPI";

type EditCreditCardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  card: CreditCard | null;
  onEdit: (cardId: string, updatedCard: { cardHolder: string; CVV: string; number: string }) => void;
};

const EditCreditCardDialog = ({ isOpen, onClose, card, onEdit }: EditCreditCardDialogProps) => {
  const form = useForm<AddCard>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      cardHolder: card?.cardHolder || "",
      number: card?.number || "",
      cvv: card?.CVV || "",
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AddCard) => {
    if (card) {
      setLoading(true);
      try {
        const updatedCard = {
          cardHolder: data.cardHolder,
          number: data.number,
          CVV: data.cvv,
        };

        await updateCreditCard(card.cardId, updatedCard);
        onEdit(card.cardId, updatedCard);
        toast.success("Credit card updated successfully!");
        onClose();
      } catch (error) {
        toast.error("Failed to update credit card. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 rounded-lg shadow-lg transition-all bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Edit Credit Card</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter cardholder's name"
                      className="p-3 text-lg border rounded-md focus:ring-2 focus:ring-indigo-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter card number"
                      className="p-3 text-lg text-center border rounded-md focus:ring-2 focus:ring-indigo-400"
                      {...field}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        className="p-3 text-lg text-center border rounded-md focus:ring-2 focus:ring-indigo-400"
                        {...field}
                        inputMode="numeric"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter CVV"
                        className="p-3 text-lg text-center border rounded-md focus:ring-2 focus:ring-indigo-400"
                        {...field}
                        type="text"
                        inputMode="numeric"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-between space-x-4">
              <Button
                variant="outline"
                className="px-6 py-2 text-gray-600 hover:bg-gray-200"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Confirm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCreditCardDialog;
