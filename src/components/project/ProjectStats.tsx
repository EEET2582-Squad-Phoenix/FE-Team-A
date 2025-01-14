import React from "react";
import { Progress } from "../ui/progress";
import { HandCoins } from "lucide-react";

type ProjectStatsProps = {
  goalAmount: number;
  raisedAmount: number;
};

const ProjectStats = ({ goalAmount, raisedAmount }: ProjectStatsProps) => {
  const percentageRaised = (raisedAmount / goalAmount) * 100;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3">Funding Status</h3>

      <div className="flex items-center mb-4">
        <HandCoins className="text-3xl text-green-500 mr-2" />
        <span className="font-semibold text-lg">
          {percentageRaised.toFixed(0)}% Funded
        </span>
      </div>

      <Progress
        value={percentageRaised}
        className="w-full h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg"
      />

      <div className="flex items-center justify-between mt-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Raised Amount</p>
          <p className="text-2xl font-semibold text-green-600">
            {raisedAmount.toFixed(2)} USD
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Goal Amount</p>
          <p className="text-2xl font-semibold">{goalAmount.toFixed(2)} USD</p>
        </div>
      </div>

      {/* Small message when the project is fully funded */}
      {raisedAmount >= goalAmount && (
        <p className="mt-4 text-green-600 font-semibold text-lg text-center">
          🎉 Fully Funded! Thank you to all contributors.
        </p>
      )}
    </div>
  );
};

export default ProjectStats;
