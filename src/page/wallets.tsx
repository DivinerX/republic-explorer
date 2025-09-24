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
} from "chart.js";
import { Line } from "react-chartjs-2";

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

interface AccountData {
  id: number;
  name: string;
  icon: string;
  color: string;
  free: number;
  delegated: number;
  total: number;
}

const accountsData: AccountData[] = [
  {
    id: 1,
    name: "Validator X",
    icon: "X",
    color: "bg-red-500",
    free: 500,
    delegated: 700,
    total: 1200,
  },
  {
    id: 2,
    name: "Crypto Node",
    icon: "⚡",
    color: "bg-blue-500",
    free: 1200,
    delegated: 2250,
    total: 3450,
  },
  {
    id: 3,
    name: "Safe Stake",
    icon: "+",
    color: "bg-green-500",
    free: 800,
    delegated: 1800,
    total: 2600,
  },
  {
    id: 4,
    name: "REP King",
    icon: "♔",
    color: "bg-green-600",
    free: 1500,
    delegated: 3200,
    total: 4700,
  },
  {
    id: 5,
    name: "SOL Warrior",
    icon: "≡",
    color: "bg-blue-600",
    free: 900,
    delegated: 2100,
    total: 3000,
  },
  {
    id: 6,
    name: "Satoshi",
    icon: "₿",
    color: "bg-orange-500",
    free: 2000,
    delegated: 4500,
    total: 6500,
  },
  {
    id: 7,
    name: "ETH King",
    icon: "♦",
    color: "bg-purple-500",
    free: 1100,
    delegated: 2800,
    total: 3900,
  },
  {
    id: 8,
    name: "REP Knight",
    icon: "♞",
    color: "bg-green-600",
    free: 750,
    delegated: 1650,
    total: 2400,
  },
  {
    id: 9,
    name: "G Trader",
    icon: "G",
    color: "bg-green-500",
    free: 1300,
    delegated: 2900,
    total: 4200,
  },
  {
    id: 10,
    name: "Power Up",
    icon: "⏫",
    color: "bg-blue-500",
    free: 600,
    delegated: 1400,
    total: 2000,
  },
];

export default function Wallets() {
  const [currentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const totalPages = 5898;

  const rowsPerPageOptions = [10, 25, 50, 100];
  const timeRanges = ["7d", "30d", "90d", "180d", "1y"];

  // Account growth data for different time ranges
  const accountGrowthData = {
    "7d": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [280000, 285000, 282000, 290000, 295000, 298000, 300000],
    },
    "30d": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [250000, 270000, 285000, 300000],
    },
    "90d": {
      labels: ["Month 1", "Month 2", "Month 3"],
      data: [200000, 250000, 300000],
    },
    "180d": {
      labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
      data: [150000, 180000, 220000, 250000, 275000, 300000],
    },
    "1y": {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      data: [100000, 180000, 250000, 300000],
    },
  };

  const currentData =
    accountGrowthData[selectedTimeRange as keyof typeof accountGrowthData];

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Accounts",
        data: currentData.data,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#22c55e",
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
        backgroundColor: "#090909",
        titleColor: "#ffffff",
        bodyColor: "#A8A8A8",
        borderColor: "#22c55e",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `Accounts: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#333333",
          drawBorder: false,
        },
        ticks: {
          color: "#A8A8A8",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#333333",
          drawBorder: false,
        },
        ticks: {
          color: "#A8A8A8",
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "#22c55e",
      },
    },
  };

  // Filter accounts based on search term
  const filteredAccounts = accountsData.filter(
    (account) =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.free.toString().includes(searchTerm) ||
      account.delegated.toString().includes(searchTerm) ||
      account.total.toString().includes(searchTerm)
  );

  const handleCSVExport = () => {
    const csvContent = [
      ["Name", "Free", "Delegated", "Total"],
      ...filteredAccounts.map((account) => [
        account.name,
        `${account.free} REP`,
        `${account.delegated} REP`,
        `${account.total} REP`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "accounts.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[#050607]">
      <div className="px-8 mx-auto px-32">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-white">Accounts</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <div className="">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[#A8A8A8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2B2B2B] border border-[#333] rounded-lg text-white placeholder-[#A8A8A8] focus:outline-none focus:border-[#22c55e]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Table Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-[#A8A8A8] text-sm">Rows:</span>
                <div className="flex space-x-2">
                  {rowsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setRowsPerPage(option)}
                      className={`px-2 py-1 text-sm rounded ${
                        rowsPerPage === option
                          ? "bg-[#2B2B2B] text-white"
                          : "text-[#A8A8A8] hover:text-white hover:bg-[#090909]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleCSVExport}
              className="flex items-center space-x-2 px-2 py-1 bg-[#333333] text-white rounded-lg hover:bg-[#0D0F0F] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#090909]">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Free
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Delegated
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="bg-[#0C0C0C] text-[#A8A8A8]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${account.color} flex items-center justify-center text-white text-sm font-bold mr-3`}
                        >
                          {account.icon}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {account.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {account.free.toLocaleString()} REP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {account.delegated.toLocaleString()} REP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {account.total.toLocaleString()} REP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2 bg-[#0D0F0F]">
            <button
              className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="px-2 my-2 text-sm bg-[#333333] text-white rounded">
              1
            </button>
            <button className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              2
            </button>
            <button className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              3
            </button>
            <span className="px-2 text-[#A8A8A8]">...</span>
            <button className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              {totalPages.toLocaleString()}
            </button>
            <button className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              Next
            </button>
          </div>
          <div className="text-sm text-[#A8A8A8]">
            Showing 1 to {rowsPerPage} of {filteredAccounts.length} entries
          </div>
        </div>

        {/* Number of Accounts Graph */}
        <h3 className="text-4xl text-white my-8">Number of Accounts</h3>
        <div className="mb-8">
          <div className="bg-[#090909] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              {/* Time Range Selectors */}
              <div className="flex gap-2">
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
            </div>

            {/* Account Growth Chart */}
            <div className="h-80 bg-[#0D0F0F] rounded-lg p-6">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
