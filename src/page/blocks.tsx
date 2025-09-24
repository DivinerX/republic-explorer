import { useState } from "react";

interface BlockData {
  id: number;
  height: number;
  hash: string;
  proposer: string;
  timestamp: string;
  txCount: number;
}

const blocksData: BlockData[] = [
  {
    id: 1,
    height: 102345,
    hash: "0xA1B2C3D4E5F6G7H8I9J0",
    proposer: "validator_01",
    timestamp: "2025-09-17 18:00",
    txCount: 12,
  },
  {
    id: 2,
    height: 102346,
    hash: "0xB2C3D4E5F6G7H8I9J0K1",
    proposer: "validator_05",
    timestamp: "2025-09-17 18:01",
    txCount: 8,
  },
  {
    id: 3,
    height: 102347,
    hash: "0xC3D4E5F6G7H8I9J0K1L2",
    proposer: "validator_03",
    timestamp: "2025-09-17 18:02",
    txCount: 15,
  },
  {
    id: 4,
    height: 102348,
    hash: "0xD4E5F6G7H8I9J0K1L2M3",
    proposer: "validator_07",
    timestamp: "2025-09-17 18:03",
    txCount: 6,
  },
  {
    id: 5,
    height: 102349,
    hash: "0xE5F6G7H8I9J0K1L2M3N4",
    proposer: "validator_02",
    timestamp: "2025-09-17 18:04",
    txCount: 20,
  },
  {
    id: 6,
    height: 102350,
    hash: "0xF6G7H8I9J0K1L2M3N4O5",
    proposer: "validator_09",
    timestamp: "2025-09-17 18:05",
    txCount: 4,
  },
  {
    id: 7,
    height: 102351,
    hash: "0xG7H8I9J0K1L2M3N4O5P6",
    proposer: "validator_04",
    timestamp: "2025-09-17 18:06",
    txCount: 18,
  },
  {
    id: 8,
    height: 102352,
    hash: "0xH8I9J0K1L2M3N4O5P6Q7",
    proposer: "validator_08",
    timestamp: "2025-09-17 18:07",
    txCount: 11,
  },
  {
    id: 9,
    height: 102353,
    hash: "0xI9J0K1L2M3N4O5P6Q7R8",
    proposer: "validator_06",
    timestamp: "2025-09-17 18:08",
    txCount: 7,
  },
  {
    id: 10,
    height: 102354,
    hash: "0xJ0K1L2M3N4O5P6Q7R8S9",
    proposer: "validator_10",
    timestamp: "2025-09-17 18:09",
    txCount: 14,
  },
];

export default function Blocks() {
  const [currentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = 5898;

  const rowsPerPageOptions = [10, 25, 50, 100];

  // Filter blocks based on search term
  const filteredBlocks = blocksData.filter(
    (block) =>
      block.height.toString().includes(searchTerm) ||
      block.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.proposer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCSVExport = () => {
    const csvContent = [
      ["Height", "Hash", "Proposer", "Timestamp", "Tx Count"],
      ...filteredBlocks.map((block) => [
        block.height.toString(),
        block.hash,
        block.proposer,
        block.timestamp,
        block.txCount.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blocks.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[#050607]">
      <div className="px-8 mx-auto px-32">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-white">Blocks</h1>
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
                placeholder="Search by Validator"
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

        {/* Blocks Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#090909]">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Height
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Hash
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Proposer
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-white">
                    Tx Count
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredBlocks.map((block) => (
                  <tr key={block.id} className="bg-[#0C0C0C] text-[#A8A8A8]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src="/block.svg" alt="" className="w-4 h-4 mr-3" />
                        <span className="text-sm font-medium">
                          {block.height.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {block.hash}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white text-sm">
                      {block.proposer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {block.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {block.txCount}
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
            Showing 1 to {rowsPerPage} of {filteredBlocks.length} entries
          </div>
        </div>
      </div>
    </div>
  );
}
