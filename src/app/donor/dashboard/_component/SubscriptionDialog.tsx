import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { subscribeUnsubscribe } from "@/app/api/donors/donorsAPI";
import LucideIcon from "@/components/lucide-icon";
import { toast } from "sonner"; 

const regions = ['AFRICA', 'EUROPE', 'ASIA', 'AMERICA'];
const categories = ['EDUCATION', 'HEALTH', 'RELIGION', 'ENVIRONMENTAL', 'HOUSING', 'OTHER'];

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setError(null); 
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedRegion || !selectedCategory) {
      setError("Please select both a region and a category.");
      return;
    }

    try {
      const response = await subscribeUnsubscribe(selectedRegion, selectedCategory);

      toast.success(response.message);

      onClose(); 
    } catch (err: any) {
      setError("An error occurred while processing your subscription.");
      toast.error("Error: " + (err?.message || "Unknown error")); 
    }
  };

  // Clear error message if both fields are selected
  useEffect(() => {
    if (selectedRegion && selectedCategory) {
      setError(null); 
    }
  }, [selectedRegion, selectedCategory]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-lg shadow-lg bg-white p-8 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Manage Notification</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-lg text-gray-600">Select your preferred region and category:</p>

          <div>
            <h3 className="font-semibold text-gray-700">Region</h3>
            <select
              value={selectedRegion || ""}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-100 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">Select a Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Category</h3>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 bg-gray-100 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between gap-4 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl py-2 px-6 transition"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 px-6 flex justify-center items-center gap-2 transition"
            >
              <LucideIcon name="Check" />
              <span>Confirm</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
