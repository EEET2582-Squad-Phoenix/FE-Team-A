import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
import { CheckCircle } from "lucide-react"; 
import { haltProject } from "@/app/api/charities/charitiesAPI";
import { toast } from "sonner";

type HaltProjectFormProps = {
  projectId: string;  
  onClose: () => void;
};

const HaltProjectForm = ({ projectId, onClose }: HaltProjectFormProps) => {
  const [donorReason, setDonorReason] = useState<string>("");
  const [charityReason, setCharityReason] = useState<string>("");

  const isFormValid = donorReason.trim() !== "" && charityReason.trim() !== "";

  const handleHaltProject = async () => {
    try {
      await haltProject({ projectId, donorReason, charityReason });
      toast.success("Project status updated!");
      onClose();  
    } catch (error) {
      toast.error("Failed to halt the project.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="bg-white p-6 rounded-lg max-w-md mx-auto space-y-6 shadow-lg">
        <DialogHeader>
          <DialogTitle>Change Project Status?</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            When halting a project, you need to provide a message for users to explain why the project is being paused. This will help keep everyone informed and provide transparency regarding the status change.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Donor Message</label>
          <Input
            value={donorReason}
            onChange={(e) => setDonorReason(e.target.value)}
            placeholder="Enter message for donors"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Charity Message</label>
          <Input
            value={charityReason}
            onChange={(e) => setCharityReason(e.target.value)}
            placeholder="Enter message for the charity"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 mr-2">
            Cancel
          </Button>
          <Button
            onClick={handleHaltProject}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={!isFormValid} // Disable button if form is not valid
          >
            <CheckCircle size={20} className="mr-2" />
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HaltProjectForm;
