import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LucideIcon from "@/components/lucide-icon";
import { toast } from "sonner";
import { subscribeUnsubscribe, fetchSubscription } from "@/app/api/donors/donorsAPI";

const regions = ["AFRICA", "EUROPE", "ASIA", "AMERICA"];
const categories = [
  "FOOD",
  "EDUCATION",
  "HEALTH",
  "RELIGION",
  "ENVIRONMENT",
  "HOUSING",
  "HUMANITARIAN",
  "OTHER",
];

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<{
    continent: string;
    category: string;
    id: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadSubscription = async () => {
        try {
          const subscription = await fetchSubscription();
          setCurrentSubscription(subscription);
        } catch {
        }
      };

      loadSubscription();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedRegion || !selectedCategory) {
      toast.error("Please select both a region and a category.");
      return;
    }

    setLoading(true);
    try {
      if (currentSubscription) {
        await subscribeUnsubscribe(currentSubscription.continent, currentSubscription.category);
      }
      const response = await subscribeUnsubscribe(selectedRegion, selectedCategory);
      toast.success(response.message);
      setCurrentSubscription({
        continent: selectedRegion,
        category: selectedCategory,
        id: "",
      });
      onClose();
    } catch (error: any) {
      toast.error("Submission failed: " + (error?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-8 space-y-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <LucideIcon name="Bell" size={24} />
            Manage Subscription
          </DialogTitle>
        </DialogHeader>

        {currentSubscription && (
          <Card className="border border-indigo-300 bg-indigo-100 rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-indigo-600 uppercase">
                Current Subscription
              </CardTitle>
              <CardDescription className="text-gray-700 mt-2">
                <div>
                  Region: <span className="font-semibold">{currentSubscription.continent}</span>
                </div>
                <div>
                  Category: <span className="font-semibold">{currentSubscription.category}</span>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 text-lg">Select Region</h3>
            <Select value={selectedRegion || undefined} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full border border-gray-300 rounded-lg p-2">
                <SelectValue placeholder="Choose a Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 text-lg">Select Category</h3>
            <Select value={selectedCategory || undefined} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full border border-gray-300 rounded-lg p-2">
                <SelectValue placeholder="Choose a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-2 px-4"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white rounded-lg py-2 px-4 flex items-center gap-2`}
          >
            {loading && <LucideIcon name="Loader" className="animate-spin" />}
            {!loading && <LucideIcon name="Check" />}
            <span>{loading ? "Submitting..." : "Confirm"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
