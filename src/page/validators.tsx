import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ValidatorData {
  id: number;
  rank: number;
  name: string;
  icon: string;
  color: string;
  totalStake: string;
  selfStake: string;
  delegators: number;
  incentive: number;
  dividends: number;
  uptime: number;
}

const validatorsData: ValidatorData[] = [
  {
    id: 1,
    rank: 1,
    name: "Validator X",
    icon: "X",
    color: "bg-red-500",
    totalStake: "2,450,000",
    selfStake: "300,000",
    delegators: 152,
    incentive: 87.3,
    dividends: 90,
    uptime: 99.9
  },
  {
    id: 2,
    rank: 2,
    name: "Crypto Node",
    icon: "⚡",
    color: "bg-blue-500",
    totalStake: "1,980,000",
    selfStake: "250,000",
    delegators: 121,
    incentive: 85.1,
    dividends: 88,
    uptime: 99.7
  },
  {
    id: 3,
    rank: 3,
    name: "Safe Stake",
    icon: "+",
    color: "bg-green-500",
    totalStake: "1,720,000",
    selfStake: "210,000",
    delegators: 110,
    incentive: 82.6,
    dividends: 85,
    uptime: 99.5
  },
  {
    id: 4,
    rank: 4,
    name: "REP King",
    icon: "↑",
    color: "bg-gray-600",
    totalStake: "1,530,000",
    selfStake: "190,000",
    delegators: 98,
    incentive: 81.2,
    dividends: 83,
    uptime: 99.3
  },
  {
    id: 5,
    rank: 5,
    name: "SOL Warrior",
    icon: "≡",
    color: "bg-gray-600",
    totalStake: "1,300,000",
    selfStake: "170,000",
    delegators: 87,
    incentive: 80.5,
    dividends: 82,
    uptime: 99.1
  },
  {
    id: 6,
    rank: 6,
    name: "Satoshi",
    icon: "₿",
    color: "bg-gray-600",
    totalStake: "1,050,000",
    selfStake: "140,000",
    delegators: 76,
    incentive: 78.9,
    dividends: 80,
    uptime: 98.9
  },
  {
    id: 7,
    rank: 7,
    name: "ETH King",
    icon: "Ξ",
    color: "bg-gray-600",
    totalStake: "890,000",
    selfStake: "120,000",
    delegators: 68,
    incentive: 77.4,
    dividends: 78,
    uptime: 98.7
  },
  {
    id: 8,
    rank: 8,
    name: "REP Knight",
    icon: "♞",
    color: "bg-gray-600",
    totalStake: "760,000",
    selfStake: "100,000",
    delegators: 55,
    incentive: 75.8,
    dividends: 76,
    uptime: 98.5
  },
  {
    id: 9,
    rank: 9,
    name: "G Trader",
    icon: "G",
    color: "bg-purple-600",
    totalStake: "640,000",
    selfStake: "90,000",
    delegators: 49,
    incentive: 74.1,
    dividends: 74,
    uptime: 98.3
  },
  {
    id: 10,
    rank: 10,
    name: "Power Up",
    icon: "⏫",
    color: "bg-blue-500",
    totalStake: "520,000",
    selfStake: "75,000",
    delegators: 41,
    incentive: 72.9,
    dividends: 72,
    uptime: 98.0
  }
];

export default function Validators() {
  const navigate = useNavigate();
  const [currentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const entriesPerPage = 10;

  // Filter validators based on search term
  const filteredValidators = validatorsData.filter(validator =>
    validator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle validator row click
  const handleValidatorClick = (validatorId: number) => {
    navigate(`/validators/${validatorId}`);
  };

  return (
    <div className="min-h-screen text-white p-6 bg-[#050607]">
      <div className="px-8 mx-auto px-32">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-white">Validators</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[#A8A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

        {/* Validators Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#090909]">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-white">Rank</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Name</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Total Stake</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Self-Stake</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Delegators</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Incentive</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Dividends %</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Uptime</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredValidators.map((validator) => (
                  <tr 
                    key={validator.id} 
                    className="bg-[#0C0C0C] text-[#A8A8A8] hover:bg-[#1a1a1a] cursor-pointer transition-colors"
                    onClick={() => handleValidatorClick(validator.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {validator.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${validator.color} flex items-center justify-center text-white text-sm font-bold mr-3`}>
                          {validator.icon}
                        </div>
                        <span className="text-sm font-medium text-white">{validator.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {validator.totalStake} REP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {validator.selfStake} REP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {validator.delegators}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-green-500 font-medium">{validator.incentive}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-blue-500 font-medium">{validator.dividends}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-green-500 font-medium">{validator.uptime}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2 bg-[#0C0C0C]">
            <button 
              className="px-2 my-2 text-sm text-[#333333] hover:text-white hover:bg-[#090909] rounded"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="px-2 my-2 text-sm bg-[#333333] text-white rounded">
              {currentPage}
            </button>
            <button className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              {currentPage + 1}
            </button>
            <button 
              className="px-2 my-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-[#A8A8A8]">
            Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredValidators.length)} of {filteredValidators.length} entries
          </div>
        </div>
      </div>
    </div>
  );
}
