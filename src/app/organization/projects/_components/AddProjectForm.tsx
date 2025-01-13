"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchProjectCountries } from "@/app/api/projects/projectsAPI";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

type AddProjectFormProps = {
  onClose: () => void;
  onSave: (data: any) => void;
};

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goalAmount: 0,
    country: "",
    categories: [],
    startDate: new Date(),
    endDate: new Date(),
    img: [""],
    thumbnail: "",
    vid: [""],
  });
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

  const handleAddImage = () => {
    setFormData({ ...formData, img: [...formData.img, ""] });
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.img];
    updatedImages[index] = value;
    setFormData({ ...formData, img: updatedImages });
  };

  const handleAddVideo = () => {
    setFormData({ ...formData, vid: [...formData.vid, ""] });
  };

  const handleVideoChange = (index: number, value: string) => {
    const updatedVideos = [...formData.vid];
    updatedVideos[index] = value;
    setFormData({ ...formData, vid: updatedVideos });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      toast.error("Name and description are required.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-6">
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl mx-auto p-6 space-y-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <PlusCircle className="w-6 h-6" /> Add Project
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
          <Label htmlFor="categories">Category</Label>
          <Select
            onValueChange={(value) => handleInputChange("categories", [...formData.categories, value])}
            value=""
          >
            <SelectTrigger id="categories" className="w-full">
              Add Category
            </SelectTrigger>
            <SelectContent>
              {["FOOD", "EDUCATION", "HEALTH", "RELIGION", "ENVIRONMENT", "HOUSING", "HUMANITARIAN", "OTHER"].map(
                (categories) => (
                  <SelectItem key={categories} value={categories}>
                    {categories}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <div className="mt-2">
            {formData.categories.map((cat, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs mr-2"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label>Image URLs</Label>
          {formData.img.map((url, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() =>
                  setFormData({
                    ...formData,
                    img: formData.img.filter((_, i) => i !== index),
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddImage}>Add Image URL</Button>
        </div>

        <div>
          <Label htmlFor="thumbnail">Thumbnail URL</Label>
          <Input
            id="thumbnail"
            value={formData.thumbnail}
            onChange={(e) => handleInputChange("thumbnail", e.target.value)}
          />
        </div>

        <div>
          <Label>Video URLs</Label>
          {formData.vid.map((url, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                value={url}
                onChange={(e) => handleVideoChange(index, e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() =>
                  setFormData({
                    ...formData,
                    vid: formData.vid.filter((_, i) => i !== index),
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddVideo}>Add Video URL</Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
              id="startDate"
              selected={formData.startDate}
              onChange={(date) => handleInputChange("startDate", date)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <DatePicker
              id="endDate"
              selected={formData.endDate}
              onChange={(date) => handleInputChange("endDate", date)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Add Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
