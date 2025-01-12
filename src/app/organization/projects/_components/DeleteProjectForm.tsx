import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

type DeleteProjectFormProps = {
  projectId: string;
  onClose: () => void;
  onConfirm: (projectId: string, deletionReason: string) => Promise<void>;
};

const DeleteProjectForm = ({ projectId, onClose, onConfirm }: DeleteProjectFormProps) => {
  const [deletionReason, setDeletionReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Check if the form is valid (deletionReason has input)
  const isFormValid = deletionReason.trim() !== "";

  const remainingChars = 150 - deletionReason.length;

  const handleDeleteProject = async () => {
    if (!deletionReason) {
      toast.error("Reason for deletion is required.");
      return;
    }

    if (deletionReason.length > 150) {
      toast.error("Reason cannot exceed 150 characters.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Call the delete API
      await onConfirm(projectId, deletionReason);
      toast.success("Project deleted successfully!");
      onClose();  
    } catch (error) {
      toast.error("Failed to delete the project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="bg-white p-6 rounded-lg max-w-md mx-auto space-y-6 shadow-lg">
        <DialogHeader>
          <DialogTitle>Reason for Project Deletion</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            Deleting a project is a significant decision. Please provide a reason for deletion. This message will help the admins understand why you’re requesting to remove it.
          </p>

          <label className="block text-sm font-medium mb-2">Reason for Deletion</label>
          <Input
            value={deletionReason}
            onChange={(e) => setDeletionReason(e.target.value)}
            placeholder="Enter reason for deletion (Max 150 characters)"
            maxLength={150}
            className="w-full p-3 border rounded-md"
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            {remainingChars} character{remainingChars !== 1 ? 's' : ''} remaining
          </p>
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 mr-2">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProject}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Deleting..." : (
              <>
                <CheckCircle size={20} className="mr-2" />
                Confirm
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectForm;
