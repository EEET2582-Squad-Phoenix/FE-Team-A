import React from "react";
import DonationsClientPage from "./DonationsClientPage/DonationsClientPage";
import { IDonation, IRecurringDonation } from "@/types/donation";


export default async function Page() {
  return (
    <DonationsClientPage
    />
  );
}