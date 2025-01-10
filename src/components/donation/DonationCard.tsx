import React from "react";
import { IDonation } from "@/types/donation";
import { Clock, RefreshCcw, CheckCircle } from "lucide-react"; 

interface DonationCardProps {
  donation: IDonation;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const formattedDate = new Date(donation.createdAt).toLocaleDateString();
  
  const donationStatus = donation.isRecurring ? 'Recurring' : 'One-time';

  return (
    <div className="transition-transform transform p-4 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 rounded-lg shadow-lg hover:shadow-2xl flex justify-between items-center w-full h-30 mb-4">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-semibold text-indigo-800 flex-1">{donation.projectName}</h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              donation.isRecurring ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
            }`}
          >
            {donationStatus}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-gray-700 italic truncate">{donation.message || "No message provided"}</p>
        
        <p className="mt-1 text-xs text-gray-500">
          <Clock className="inline-block mr-1" size={14} />
          Donated on: {formattedDate}
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-gray-600">Donation Amount:</p>
        <p className="font-bold text-2xl text-green-600">${donation.amount}</p>
      </div>
      
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
        {donation.isRecurring ? (
          <RefreshCcw className="text-green-600" size={16} />
        ) : (
          <CheckCircle className="text-yellow-500" size={16} />
        )}
      </div>
    </div>
  );
};

export default DonationCard;
