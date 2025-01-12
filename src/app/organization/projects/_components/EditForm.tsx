"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { fetchProjectCountries } from "@/app/api/projects/projectsAPI";
import { Edit2 } from "lucide-react";
import { IProject } from "@/types/project";

export function EditProjectForm({
  project,
  onClose,
  onSave,
}: {
  project: IProject;
  onClose: () => void;
  onSave: (data: IProject) => void;
}) {
  const [formData, setFormData] = useState<IProject>(project);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryList = await fetchProjectCountries();
        setCountries(countryList);
      } catch (error) {
        toast.error("Failed to fetch countries.");
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    onSave(formData);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-6"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl mx-auto p-6 space-y-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <Edit2 className="w-6 h-6" /> Edit Project
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="goalAmount">Goal Amount</Label>
            <Input
              id="goalAmount"
              type="number"
              value={formData.goalAmount || ""}
              onChange={(e) => handleInputChange("goalAmount", parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            onValueChange={(value) => handleInputChange("country", value)}
            value={formData.country}
          >
            <SelectTrigger id="country" className="w-full">
              Select Country
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => handleInputChange("category", [value])}
            value={formData.category?.[0] || ""}
          >
            <SelectTrigger id="category" className="w-full">
              Select Category
            </SelectTrigger>
            <SelectContent>
              {[
                "FOOD", "EDUCATION", "HEALTH", "RELIGION", "ENVIRONMENT",
                "HOUSING", "HUMANITARIAN", "OTHER",
              ].map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
              id="startDate"
              selected={new Date(formData.startDate || "")}
              onChange={(date) => handleInputChange("startDate", date)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <DatePicker
              id="endDate"
              selected={new Date(formData.endDate || "")}
              onChange={(date) => handleInputChange("endDate", date)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="videoURL">Video URL</Label>
          <Input
            id="videoURL"
            value={formData.videoURLs || ""}
            onChange={(e) => handleInputChange("videoURLs", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Image URLs</Label>
          {formData.imageURLs?.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => {
                  const updatedImages = [...(formData.imageURLs || [])];
                  updatedImages[index] = e.target.value;
                  handleInputChange("imageURLs", updatedImages);
                }}
              />
              <Button
                variant="destructive"
                onClick={() =>
                  handleInputChange(
                    "imageURLs",
                    formData.imageURLs?.filter((_, i) => i !== index)
                  )
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              handleInputChange("imageURLs", [...(formData.imageURLs || []), ""])
            }
          >
            Add Image URL
          </Button>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
