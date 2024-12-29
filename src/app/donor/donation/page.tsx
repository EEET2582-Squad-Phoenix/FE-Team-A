import React from "react";
import DonationsClientPage from "./DonationsClientPage/DonationsClientPage";
import { IDonation, IRecurringDonation } from "@/types/donation";

const mockDonations: IDonation[] = [
  {
    id: 1,
    projectName: "Clean Water for All",
    date: "2023-12-01",
    amount: 50,
    message: "Hope this helps!",
  },
  {
    id: 2,
    projectName: "Building Schools",
    date: "2023-11-15",
    amount: 75,
    message: "Education matters!",
  },
  {
    id: 3,
    projectName: "Emergency Food Aid",
    date: "2023-10-25",
    amount: 100,
    message: "",
  },
  {
    id: 4,
    projectName: "Emergency Food Aid 4",
    date: "2023-10-25",
    amount: 100,
    message: "",
  },
  {
    id: 5,
    projectName: "Emergency Food Aid 5",
    date: "2023-10-25",
    amount: 100,
    message: "",
  },
  {
    id: 6,
    projectName: "Emergency Food Aid 6",
    date: "2023-10-25",
    amount: 100,
    message: "",
  },
  {
    id: 7,
    projectName: "Emergency Food Aid 7",
    date: "2023-10-25",
    amount: 100,
    message: "",
  },
  {
    id: 8,
    projectName: "Emergency Food Aid 8",
    date: "2023-10-25",
    amount: 100,
    message: "",
  },
];

const mockRecurringDonations: IRecurringDonation[] = [
  {
    id: 1,
    projectName: "Clean Water for All",
    amount: 20,
    nextDate: "2024-01-15",
  },
  {
    id: 2,
    projectName: "Housing for Refugees",
    amount: 30,
    nextDate: "2024-01-15",
  },
];


export default async function Page() {
  return (
    <DonationsClientPage
      donations={mockDonations}
      recurringDonations={mockRecurringDonations}
    />
  );
}