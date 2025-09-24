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

interface TransactionData {
  id: number;
  extrinsicId: number;
  from: string;
  to: string;
  amount: number;
  time: string;
}

const transactionsData: TransactionData[] = [
  {
    id: 1,
    extrinsicId: 102345,
    from: "0xA1B2C3D4E5F6G7H8I9J0",
    to: "0xB2C3D4E5F6G7H8I9J0A1",
    amount: 12,
    time: "2025-09-17 18:00",
  },
  {
    id: 2,
    extrinsicId: 102346,
    from: "0xB2C3D4E5F6G7H8I9J0A1",
    to: "0xC3D4E5F6G7H8I9J0A1B2",
    amount: 8,
    time: "2025-09-17 18:01",
  },
  {
    id: 3,
    extrinsicId: 102347,
    from: "0xC3D4E5F6G7H8I9J0A1B2",
    to: "0xD4E5F6G7H8I9J0A1B2C3",
    amount: 15,
    time: "2025-09-17 18:02",
  },
  {
    id: 4,
    extrinsicId: 102348,
    from: "0xD4E5F6G7H8I9J0A1B2C3",
    to: "0xE5F6G7H8I9J0A1B2C3D4",
    amount: 9,
    time: "2025-09-17 18:03",
  },
  {
    id: 5,
    extrinsicId: 102349,
    from: "0xE5F6G7H8I9J0A1B2C3D4",
    to: "0xF6G7H8I9J0A1B2C3D4E5",
    amount: 11,
    time: "2025-09-17 18:04",
  },
  {
    id: 6,
    extrinsicId: 102350,
    from: "0xF6G7H8I9J0A1B2C3D4E5",
    to: "0xG7H8I9J0A1B2C3D4E5F6",
    amount: 14,
    time: "2025-09-17 18:05",
  },
  {
    id: 7,
    extrinsicId: 102351,
    from: "0xG7H8I9J0A1B2C3D4E5F6",
    to: "0xH8I9J0A1B2C3D4E5F6G7",
    amount: 10,
    time: "2025-09-17 18:06",
  },
  {
    id: 8,
    extrinsicId: 102352,
    from: "0xH8I9J0A1B2C3D4E5F6G7",
    to: "0xI9J0A1B2C3D4E5F6G7H8",
    amount: 13,
    time: "2025-09-17 18:07",
  },
  {
    id: 9,
    extrinsicId: 102353,
    from: "0xI9J0A1B2C3D4E5F6G7H8",
    to: "0xJ0A1B2C3D4E5F6G7H8I9",
    amount: 7,
    time: "2025-09-17 18:08",
  },
  {
    id: 10,
    extrinsicId: 102354,
    from: "0xJ0A1B2C3D4E5F6G7H8I9",
    to: "0xA1B2C3D4E5F6G7H8I9J0",
    amount: 16,
    time: "2025-09-17 18:09",
  },
];

export default function Transactions() {
  const [currentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const totalPages = 5898;

  const rowsPerPageOptions = [10, 25, 50, 100];
  const timeRanges = ["7d", "30d", "90d", "180d", "1y"];

  // Transaction volume data for different time ranges
  const transactionVolumeData = {
    "7d": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [
        15000000, 15200000, 14800000, 16000000, 16500000, 16800000, 17000000,
      ],
    },
    "30d": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [12000000, 14000000, 15500000, 17000000],
    },
    "90d": {
      labels: ["Month 1", "Month 2", "Month 3"],
      data: [8000000, 12000000, 17000000],
    },
    "180d": {
      labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
      data: [5000000, 7000000, 9000000, 12000000, 14000000, 17000000],
    },
    "1y": {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      data: [3000000, 8000000, 13000000, 17000000],
    },
  };

  const currentData =
    transactionVolumeData[
      selectedTimeRange as keyof typeof transactionVolumeData
    ];

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: "Transactions",
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
            return `Transactions: ${context.parsed.y.toLocaleString()}`;
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

  // Filter transactions based on search term
  const filteredTransactions = transactionsData.filter(
    (transaction) =>
      transaction.extrinsicId.toString().includes(searchTerm) ||
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );

  const handleCSVExport = () => {
    const csvContent = [
      ["Extrinsic ID", "From", "To", "Amount", "Time"],
      ...filteredTransactions.map((transaction) => [
        transaction.extrinsicId.toString(),
        transaction.from,
        transaction.to,
        `${transaction.amount} REP`,
        transaction.time,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[#050607]">
      <div className="px-8 mx-auto px-32">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-white">Transactions</h1>
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
                placeholder="Search by Address"
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

        {/* Transactions Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#090909]">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Extrinsic ID
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    From
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    To
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="bg-[#0C0C0C] text-[#A8A8A8]"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {transaction.extrinsicId.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {transaction.from}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {transaction.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.amount} REP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.time}
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
            Showing 1 to {rowsPerPage} of {filteredTransactions.length} entries
          </div>
        </div>

        {/* Number of Transactions Graph */}
        <h3 className="text-4xl text-white my-8">
          Number of Transactions
        </h3>
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

            {/* Transaction Volume Chart */}
            <div className="h-80 bg-[#0D0F0F] rounded-lg p-6">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
