"use client";
import React from 'react';

const individualDonors = [
  { avatar: '/gura.jpg', firstName: 'John', lastName: 'Doe', donationAmount: 1200 },
  { avatar: '/gura.jpg', firstName: 'Jane', lastName: 'Smith', donationAmount: 950 },
  { avatar: '/gura.jpg', firstName: 'Alice', lastName: 'Johnson', donationAmount: 800 },
  { avatar: '/gura.jpg', firstName: 'Bob', lastName: 'Brown', donationAmount: 700 },
  { avatar: '/gura.jpg', firstName: 'Charlie', lastName: 'Davis', donationAmount: 650 },
  { avatar: '/gura.jpg', firstName: 'Emily', lastName: 'Miller', donationAmount: 600 },
  { avatar: '/gura.jpg', firstName: 'David', lastName: 'Garcia', donationAmount: 550 },
  { avatar: '/gura.jpg', firstName: 'Sarah', lastName: 'Martinez', donationAmount: 500 },
  { avatar: '/gura.jpg', firstName: 'Michael', lastName: 'Taylor', donationAmount: 450 },
  { avatar: '/gura.jpg', firstName: 'Jessica', lastName: 'Moore', donationAmount: 400 },
];

const organizationDonors = [
  { logo: '/gura.jpg', name: 'CharityOrg 1', donationAmount: 5000 },
  { logo: '/gura.jpg', name: 'CharityOrg 2', donationAmount: 4200 },
  { logo: '/gura.jpg', name: 'CharityOrg 3', donationAmount: 3800 },
  { logo: '/gura.jpg', name: 'CharityOrg 4', donationAmount: 3500 },
  { logo: '/gura.jpg', name: 'CharityOrg 5', donationAmount: 3000 },
  { logo: '/gura.jpg', name: 'CharityOrg 6', donationAmount: 2700 },
  { logo: '/gura.jpg', name: 'CharityOrg 7', donationAmount: 2400 },
  { logo: '/gura.jpg', name: 'CharityOrg 8', donationAmount: 2100 },
  { logo: '/gura.jpg', name: 'CharityOrg 9', donationAmount: 1800 },
  { logo: '/gura.jpg', name: 'CharityOrg 10', donationAmount: 1500 },
];

const Leaderboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Monthly Donation Leaderboard</h2>
      <div className="flex justify-between gap-6">
        
        {/* Individual DONORS Table */}
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-4">Top Individual Donors</h3>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {individualDonors.map((donor, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center">
                  <img
                    src={donor.avatar}
                    alt={`${donor.firstName} ${donor.lastName}`}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <span className="text-lg font-semibold">{`${donor.firstName} ${donor.lastName}`}</span>
                </div>
                <span className="text-lg font-semibold">${donor.donationAmount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Charity Table */}
        <div className="w-1/2">
          <h3 className="text-xl font-semibold mb-4">Top Charity</h3>
          <div className="bg-white shadow-lg rounded-lg p-4">
            {organizationDonors.map((organization, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center">
                  <img
                    src={organization.logo}
                    alt={organization.name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <span className="text-lg font-semibold">{organization.name}</span>
                </div>
                <span className="text-lg font-semibold">${organization.donationAmount}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
