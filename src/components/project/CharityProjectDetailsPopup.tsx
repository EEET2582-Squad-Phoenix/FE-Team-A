"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { IProject } from "@/types/project";
import { Button } from "../ui/button";
import ProjectImages from "./ProjectImages";
import ProjectVideos from "./ProjectVideos";
import ProjectStats from "./ProjectStats";
import ProjectCategoryDetails from "./ProjectCategoryDetails";
import ProjectDuration from "./ProjectDuration";
import DonationCard from "../donation/DonationCard";
import { fetchDonationsByProjectId } from "@/app/api/charities/charitiesAPI";

type ProjectDetailsPopupProps = {
  project: IProject;
  closeModal: () => void;
};

export const CharityProjectDetailsPopup = ({
  project,
  closeModal,
}: ProjectDetailsPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"details" | "donations">(
    "details"
  );
  const [donations, setDonations] = useState<any[]>([]);
  const [loadingDonations, setLoadingDonations] = useState<boolean>(false);
  const [errorFetchingDonations, setErrorFetchingDonations] =
    useState<string>("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    if (activeTab === "donations") {
      fetchDonations();
    }
  }, [activeTab]);

  const fetchDonations = async () => {
    setLoadingDonations(true);
    setErrorFetchingDonations("");

    try {
      const donations = await fetchDonationsByProjectId(project.id);
      setDonations(donations);
    } catch (error: any) {
      setErrorFetchingDonations(error.message);
    } finally {
      setLoadingDonations(false);
    }
  };

  const handleTabSwitch = (tab: "details" | "donations") => {
    setActiveTab(tab);
  };

  const modalContent = (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4 z-[9999]">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-10/12 lg:w-8/12 max-h-[90vh] overflow-y-auto relative"
      >
        <Button
          variant="outline"
          className="absolute top-4 right-4 text-3xl font-semibold text-gray-800 hover:text-gray-800"
          onClick={closeModal}
        >
          <span aria-hidden="true">×</span>
        </Button>

        <div className="flex mb-6">
          <Button
            variant="outline"
            className={`mr-4 flex-1 py-3 ${
              activeTab === "details"
                ? "bg-blue-500 text-white"
                : "bg-transparent"
            }`}
            onClick={() => handleTabSwitch("details")}
          >
            Project Details
          </Button>
          <Button
            variant="outline"
            className={`flex-1 py-3 ${
              activeTab === "donations"
                ? "bg-blue-500 text-white"
                : "bg-transparent"
            }`}
            onClick={() => handleTabSwitch("donations")}
          >
            Donations
          </Button>
        </div>

        {activeTab === "details" && (
          <>
            <h2 className="text-3xl font-semibold mb-4">{project.name}</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>

            <ProjectImages images={project.imageURLs} />
            <ProjectVideos videos={project.videoURLs} />

            <ProjectStats
              goalAmount={project.goalAmount}
              raisedAmount={project.raisedAmount}
            />

            <ProjectCategoryDetails
              country={project.country}
              region={project.continent}
              category={project.categories}
            />

            <ProjectDuration
              startDate={project.startDate}
              endDate={project.endDate}
            />
          </>
        )}

        {activeTab === "donations" && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Donations</h3>

            {loadingDonations && <p>Loading donations...</p>}

            {errorFetchingDonations && (
              <p className="text-red-600">{errorFetchingDonations}</p>
            )}

            <div className="max-h-[400px] overflow-y-auto">
              {donations.length === 0 &&
                !loadingDonations &&
                !errorFetchingDonations && (
                  <p>No donations found for this project.</p>
                )}

              {donations.map((donation: any) => (
                <DonationCard key={donation.id} donation={donation} allowDetailsOpen={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? ReactDOM.createPortal(modalContent, document.body)
    : null;
};

export default CharityProjectDetailsPopup;
