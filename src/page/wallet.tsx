import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import validator from "/validator.svg";
import crypto_node from "/crypto_node.svg";
import safe_stake from "/safe_stake.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DelegationBreakdown {
  id: number;
  validator: {
    name: string;
    icon: string;
    color: string;
  };
  amount: string;
  percentage: string;
  stakePercentage: string;
}

interface TransferActivity {
  id: number;
  type: "incoming" | "outgoing";
  amount: string;
  time: string;
  hash: string;
}

interface DelegationAction {
  id: number;
  action: "delegated" | "undelegated";
  validator: {
    name: string;
    icon: string;
    color: string;
  };
  amount: string;
  time: string;
  hash: string;
}

const delegationBreakdownData: DelegationBreakdown[] = [
  {
    id: 1,
    validator: { name: "Validator X", icon: validator, color: "bg-red-500" },
    amount: "5,000 REP",
    percentage: "61%",
    stakePercentage: "61%",
  },
  {
    id: 2,
    validator: { name: "Crypto Node", icon: crypto_node, color: "bg-blue-500" },
    amount: "2,000 REP",
    percentage: "12%",
    stakePercentage: "24%",
  },
  {
    id: 3,
    validator: { name: "Safe Stake", icon: safe_stake, color: "bg-green-500" },
    amount: "3,000 REP",
    percentage: "24%",
    stakePercentage: "15%",
  },
];

const transferActivityData: TransferActivity[] = [
  {
    id: 1,
    type: "incoming",
    amount: "+50",
    time: "2025-07-20 14:30",
    hash: "0x9f4a...5a2c",
  },
  {
    id: 2,
    type: "outgoing",
    amount: "-40",
    time: "2025-07-19 10:00",
    hash: "0x3d8e...6b4f",
  },
  {
    id: 3,
    type: "incoming",
    amount: "+300",
    time: "2025-07-18 13:00",
    hash: "0x3a2e...24e9",
  },
];

const delegationActionsData: DelegationAction[] = [
  {
    id: 1,
    action: "delegated",
    validator: { name: "Validator X", icon: validator, color: "bg-red-500" },
    amount: "+ 500 REP",
    time: "2025-07-20 14:30",
    hash: "0xb0a6...e0f5",
  },
  {
    id: 2,
    action: "delegated",
    validator: { name: "Crypto Node", icon: crypto_node, color: "bg-blue-500" },
    amount: "+ 300 REP",
    time: "2025-07-19 10:00",
    hash: "0x3d6e...de8a",
  },
  {
    id: 3,
    action: "undelegated",
    validator: { name: "Safe Stake", icon: safe_stake, color: "bg-green-500" },
    amount: "+ 200 REP",
    time: "2025-07-18 13:00",
    hash: "0x3a2e...24e9",
  },
];

export default function Wallet() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const walletAddress = "0xc2b7...f1da";
  const balance = "12,590";
  const delegatedStake = "8,200";
  const stakedPercentage = 65;

  const timeRanges = ["1d", "7d", "30d", "180d", "360d"];

  // Balance history data
  const balanceHistoryData = {
    '1d': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      data: [12000, 12150, 11900, 12300, 12590, 12400, 12590]
    },
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [11000, 11200, 10800, 11500, 12000, 11800, 12590]
    },
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [8000, 9500, 11000, 12590]
    },
    '180d': {
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
      data: [5000, 6500, 8000, 9500, 11000, 12590]
    },
    '360d': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      data: [3000, 6000, 9000, 12590]
    }
  };

  const currentData = balanceHistoryData[selectedTimeRange as keyof typeof balanceHistoryData];

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Balance (REP)',
        data: currentData.data,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#22c55e',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#090909',
        titleColor: '#ffffff',
        bodyColor: '#A8A8A8',
        borderColor: '#22c55e',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Balance: ${context.parsed.y.toLocaleString()} REP`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#333333',
          drawBorder: false,
        },
        ticks: {
          color: '#A8A8A8',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#333333',
          drawBorder: false,
        },
        ticks: {
          color: '#A8A8A8',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value.toLocaleString();
          }
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#22c55e',
      },
    },
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[#050607]">
      <div className="px-8 mx-auto px-32">
        {/* Wallet Address Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 bg-[#0C0C0C] p-2 px-8">
            <div>
              <img
                src="/logo.svg"
                alt=""
                className="rounded-full bg-black p-2"
              />
            </div>
            <span className="text-[#A1A1A1]">{walletAddress}</span>
            <button className="text-[#A8A8A8] hover:text-white">
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0834 6.83337H3.16671C2.2935 6.83337 1.58337 7.5435 1.58337 8.41671V16.3334C1.58337 17.2066 2.2935 17.9167 3.16671 17.9167H11.0834C11.9566 17.9167 12.6667 17.2066 12.6667 16.3334V8.41671C12.6667 7.5435 11.9566 6.83337 11.0834 6.83337Z"
                  fill="#A1A1A1"
                />
                <path
                  d="M15.8334 2.08337H7.91671C7.49678 2.08337 7.09405 2.25019 6.79712 2.54712C6.50019 2.84405 6.33337 3.24678 6.33337 3.66671V5.25004H12.6667C13.0866 5.25004 13.4894 5.41686 13.7863 5.71379C14.0832 6.01072 14.25 6.41345 14.25 6.83337V13.1667H15.8334C16.2533 13.1667 16.656 12.9999 16.953 12.703C17.2499 12.406 17.4167 12.0033 17.4167 11.5834V3.66671C17.4167 3.24678 17.2499 2.84405 16.953 2.54712C16.656 2.25019 16.2533 2.08337 15.8334 2.08337Z"
                  fill="#A1A1A1"
                />
              </svg>
            </button>
            <button className="text-[#A8A8A8] hover:text-white">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0417 12.7302V12.6225C13.9711 12.2346 14.625 11.3171 14.625 10.2475V3.44792C14.625 2.76554 14.3539 2.11111 13.8714 1.62859C13.3889 1.14607 12.7345 0.875 12.0521 0.875H5.32292C4.77887 0.874888 4.24878 1.04724 3.80883 1.36728C3.36887 1.68733 3.04169 2.13859 2.87429 2.65625H2.71517C1.99317 2.65625 1.37883 2.91037 0.956083 3.4115C0.546 3.89679 0.375 4.54358 0.375 5.22917V12.1562C0.375 12.9954 0.678208 13.7507 1.25375 14.2937C1.8285 14.8345 2.62571 15.121 3.54167 15.121H6.645L9.87183 15.125H9.87342C10.6461 15.129 11.4116 14.9667 12.0054 14.5867C12.6229 14.1908 13.0417 13.5615 13.0417 12.7302ZM2.71517 3.84375H2.75V10.2467C2.75 10.9291 3.02107 11.5836 3.50359 12.0661C3.98611 12.5486 4.64054 12.8197 5.32292 12.8197H11.851C11.8257 13.1506 11.6594 13.3976 11.3649 13.586C11.0221 13.8061 10.502 13.9407 9.87817 13.9375H9.875L6.64342 13.9335H3.54167C2.87429 13.9335 2.38583 13.7277 2.06917 13.4292C1.75408 13.1332 1.5625 12.7025 1.5625 12.1562V5.22917C1.5625 4.72646 1.68917 4.38446 1.86333 4.17704C2.02563 3.98546 2.2845 3.84375 2.71517 3.84375ZM7.51742 3.64583H11.2604C11.4179 3.64583 11.5689 3.70839 11.6803 3.81974C11.7916 3.93109 11.8542 4.08211 11.8542 4.23958V7.98337C11.8542 8.14085 11.7916 8.29187 11.6803 8.40322C11.5689 8.51457 11.4179 8.57712 11.2604 8.57712C11.1029 8.57712 10.9519 8.51457 10.8406 8.40322C10.7292 8.29187 10.6667 8.14085 10.6667 7.98337V5.6725L6.53417 9.805C6.47937 9.86168 6.41383 9.90688 6.34138 9.93797C6.26892 9.96905 6.191 9.98539 6.11216 9.98604C6.03333 9.98669 5.95515 9.97163 5.88219 9.94174C5.80924 9.91185 5.74297 9.86773 5.68724 9.81196C5.63152 9.75618 5.58747 9.68987 5.55765 9.61689C5.52783 9.5439 5.51284 9.46571 5.51356 9.38687C5.51428 9.30804 5.5307 9.23013 5.56185 9.15771C5.593 9.08528 5.63827 9.01979 5.695 8.96504L9.8275 4.83333H7.51742C7.35994 4.83333 7.20892 4.77078 7.09757 4.65943C6.98622 4.54808 6.92367 4.39706 6.92367 4.23958C6.92367 4.08211 6.98622 3.93109 7.09757 3.81974C7.20892 3.70839 7.35994 3.64583 7.51742 3.64583Z"
                  fill="#A1A1A1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="flex flex-col justify-center items-center bg-[#090909] rounded-lg p-2">
            <div>
              <div className="text-[#A8A8A8] text-xl font-light">Balance (REP)</div>
              <div className="text-3xl text-white">{balance} REP</div>
            </div>
          </div>

          {/* Delegated Stake Card */}
          <div className="flex flex-col justify-center items-center bg-[#090909] rounded-lg p-2">
            <div>
              <div className="text-[#A8A8A8] text-xl font-light">
                Delegated Stake (REP)
              </div>
              <div className="text-3xl text-white">
                {delegatedStake} REP
              </div>
            </div>
          </div>

          {/* Staked Percentage Card */}
          <div className="bg-[#090909] rounded-lg p-2 flex flex-row items-center justify-center gap-4">
            <div className="text-[#A8A8A8] text-xl font-light">% Balance Staked</div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg
                  className="w-20 h-20 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-[#1a1a1a]"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray={`${stakedPercentage}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-white">
                    {stakedPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delegation Breakdown */}
        <div className="mb-8">
          <h3 className="text-4xl text-white mb-4">
            Delegation Breakdown
          </h3>
          <div className="rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#090909]">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Validator
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      % of
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      % of Stake
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {delegationBreakdownData.map((item) => (
                    <tr key={item.id} className="bg-[#0C0C0C] text-[#A8A8A8]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img src={item.validator.icon} />
                          <span className="text-sm font-medium">
                            {item.validator.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.percentage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.stakePercentage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transfer Activity */}
        <div className="mb-8">
          <h3 className="text-4xl text-white mb-4">
            Transfer Activity
          </h3>
          <div className="rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#090909]">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Date /Time
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {transferActivityData.map((item) => (
                    <tr key={item.id} className="bg-[#0C0C0C] text-[#A8A8A8]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${
                            item.type === "incoming"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.type === "incoming" ? "Incoming" : "Outgoing"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            item.type === "incoming"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {item.amount} REP
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delegation Actions */}
        <div className="mb-8">
          <h3 className="text-4xl text-white mb-4">
            Delegation Actions
          </h3>
          <div className="rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#090909]">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Date /Time
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Action
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Validator
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-white">
                      Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {delegationActionsData.map((item) => (
                    <tr key={item.id} className="bg-[#0C0C0C] text-[#A8A8A8]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${
                            item.action === "delegated"
                              ? "text-green-500"
                              : "text-orange-500"
                          }`}
                        >
                          {item.action === "delegated"
                            ? "Delegated"
                            : "Undelegated"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img src={item.validator.icon} />
                          <span className="text-sm font-medium">
                            {item.validator.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            item.action === "delegated"
                              ? "text-green-500"
                              : "text-orange-500"
                          }
                        >
                          {item.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Visualizations - Balance History */}
        <div className="mb-8">
          <h3 className="text-4xl text-white mb-4">Visualizations</h3>
          <div className="bg-[#090909] rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Balance History
            </h4>

            {/* Time Range Selectors */}
            <div className="flex gap-2 mb-6">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-2 rounded text-sm font-medium ${
                    selectedTimeRange === range
                      ? "bg-[#0D0F0F] text-white"
                      : "text-[#A8A8A8] hover:text-white hover:bg-[#0D0F0F]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Balance History Chart */}
            <div className="h-80 bg-[#0D0F0F] rounded-lg p-6">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
