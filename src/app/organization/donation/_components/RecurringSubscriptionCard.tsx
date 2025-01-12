import React from "react";
import { Calendar, DollarSign, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type RecurringSubscriptionCardProps = {
  id: string;
  projectName: string | null;
  amount: number;
  message: string;
  nextBillingDate: number;
  status: string;
  onCancel: (id: string) => void;
};

const RecurringSubscriptionCard = ({
  id,
  projectName,
  amount,
  message,
  nextBillingDate,
  status,
  onCancel,
}: RecurringSubscriptionCardProps) => {
  const handleCancel = async () => {
    try {
      await onCancel(id);
    } catch (error) {
      alert("An error occurred while canceling the subscription.");
    }
  };

  return (
    <div className="relative border rounded-lg shadow-md p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold truncate">
          {projectName || "Unnamed Project"}
        </h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            status === "ACTIVE"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-2">
        <DollarSign className="inline w-4 h-4 mr-2 text-blue-500" />
        Amount: <span className="font-semibold">${amount}</span>
      </p>

      <p className="text-sm text-gray-700 mb-2">
        <Calendar className="inline w-4 h-4 mr-2 text-blue-500" />
        Next Billing:{" "}
        <span className="font-semibold">{new Date(nextBillingDate).toLocaleDateString()}</span>
      </p>

      <p className="text-sm text-gray-500 italic">"{message}"</p>

      <Button
        variant="outline"
        onClick={handleCancel}
        className="absolute bottom-4 right-4 flex items-center gap-2 py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        <Trash2 className="w-5 h-5" />
        Cancel Subscription
      </Button>
    </div>
  );
};

export default RecurringSubscriptionCard;
