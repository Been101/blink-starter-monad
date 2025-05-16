"use client";

import { useState } from "react";

import { useEffect } from "react";

export const Donate = () => {
  const [donations, setDonations] = useState<
    {
      address: string;
      amount: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/donate")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data.donations);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Recent Donations
      </h1>
      {donations.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No donations yet. Be the first to donate!
        </p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li
              key={donation.address}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {donation.address?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {donation.address?.slice(0, 6)}...
                    {donation.address?.slice(-4)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {donation.amount} MON
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
