import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import activeIcon from "/active.svg";
import infoIcon from "/info.svg";
import { RiTimer2Fill } from "react-icons/ri";
import { IoGiftSharp } from "react-icons/io5";
import { BsBarChartLineFill } from "react-icons/bs";
import { IoHammerSharp } from "react-icons/io5";
import { CgShapeHexagon } from "react-icons/cg";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";

interface ValidatorDetailData {
  id: number;
  name: string;
  icon: string;
  color: string;
  rank: number;
  selfStake: string;
  apy: string;
  normalReputationScore: string;
  delegatedStake: string;
  delegatorsRewardPercent: string;
  computeReputationScore: string;
  totalStakeWeight: string;
  rootPercentage: string;
  alphaPercentage: string;
  repWeighted1: string;
  repWeighted2: string;
}

interface PerformanceData {
  rank: number;
  type: string;
  hotkey: string;
  ctTake: string;
  proportion: string;
  subnetWeight: string;
  noms: string;
  familyWeight: string;
  familyBalance: string;
  dominance: string;
  divs: string;
}

const mockValidatorData: ValidatorDetailData = {
  id: 1,
  name: "Validator X",
  icon: "X",
  color: "bg-red-500",
  rank: 1,
  selfStake: "450k REP",
  apy: "12.5%",
  normalReputationScore: "0.92/1",
  delegatedStake: "2.00M REP",
  delegatorsRewardPercent: "90%",
  computeReputationScore: "0.88/1",
  totalStakeWeight: "2.45M REP",
  rootPercentage: "0.02%",
  alphaPercentage: "99.98%",
  repWeighted1: "0.76",
  repWeighted2: "4.20"
};

const mockPerformanceData: PerformanceData[] = [
  { rank: 1, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 2, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 3, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 4, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 5, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 6, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 7, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 8, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 9, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" },
  { rank: 10, type: "", hotkey: "", ctTake: "", proportion: "", subnetWeight: "", noms: "", familyWeight: "", familyBalance: "", dominance: "", divs: "" }
];

export default function ValidatorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Performance');
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    { tab: 'Performance', icon: <RiTimer2Fill size={16} /> },
    { tab: 'Staked', icon: <BsFillGrid3X3GapFill size={16} /> },
    { tab: 'Rewards', icon: <IoGiftSharp size={16} /> },
    { tab: 'Jobs History', icon: <CgShapeHexagon size={16} /> },
    { tab: 'Blocks Mined', icon: <IoHammerSharp size={16} /> },
    { tab: 'Slashing', icon: <FaLocationArrow size={16} /> },
    { tab: 'Benchmarks', icon: <BsBarChartLineFill size={16} /> }
  ];
  const rowOptions = [1, 25, 50, 100];

  // Mock data - in real app, fetch based on id
  const validator = mockValidatorData;
  const performanceData = mockPerformanceData;

  return (
    <div className="min-h-screen text-white p-6 bg-[#050607]">
      <div className="px-8 mx-auto px-32">

        {/* Back Button */}
        <button
          onClick={() => navigate('/validators')}
          className="mb-[50px] flex items-center gap-2 text-[#A8A8A8] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Validators
        </button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-8 h-8 rounded-full ${validator.color} flex items-center justify-center text-white text-xl font-bold`}>
              {validator.icon}
            </div>
            <div className='flex items-center gap-2'>
              <span className="text-[20px] text-white font-bold">{validator.name}</span>
              <img src={activeIcon} alt="active" />
              <span className="bg-[#0C0C0C] text-[#939494] px-3 py-1 rounded-full text-[15px] font-medium">
                Rank #{validator.rank}
              </span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 flex gap-6">
          <div className="w-1/2">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* First Row */}
              <div className="bg-[#090909] rounded-lg p-6">
                <div className="text-[#939494] text-[15px] font-bold mb-2">Self Stake</div>
                <div className="text-[13px] text-white font-bold">{validator.selfStake}</div>
              </div>
              <div className="bg-[#090909] rounded-lg p-6">
                <div className="text-[#939494] text-[15px] font-bold mb-2">APY (Annual % Yield)</div>
                <div className="text-[13px] text-white font-bold">{validator.apy}</div>
              </div>
              <div className="bg-[#090909] rounded-lg p-6">
                <div className="text-[#939494] text-[15px] font-bold mb-2">Normal Reputation Score</div>
                <div className="text-[13px] text-white font-bold">{validator.normalReputationScore}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Second Row */}
              <div className="bg-[#090909] rounded-lg p-6">
                <div className="text-[#939494] text-[15px] font-bold mb-2">Delegated Stake</div>
                <div className="text-[13px] text-white font-bold">{validator.delegatedStake}</div>
              </div>
              <div className="bg-[#090909] rounded-lg p-6">
                <div className="text-[#939494] text-[15px] font-bold mb-2">Delegators' Reward %</div>
                <div className="text-[13px] text-white font-bold">{validator.delegatorsRewardPercent}</div>
              </div>
              <div className="bg-[#090909] rounded-lg p-6">
                <div className="text-[#939494] text-[15px] font-bold mb-2">Compute Reputation Score</div>
                <div className="text-[13px] text-white font-bold">{validator.computeReputationScore}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#090909] w-1/3 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[#939494] text-[15px] font-bold mb-2">Total Stake Weight</div>
                <div className="text-3xl text-white font-bold">{validator.totalStakeWeight}</div>
              </div>
              <span className="bg-gradient-to-b from-[#7CFFB5] to-[#00FF6F] text-black px-3 py-1 rounded-full text-sm font-medium">
                Rank #{validator.rank}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#A8A8A8] text-sm">Root <span className='text-white'>{validator.rootPercentage}</span></span>
                <span className="text-[#A8A8A8] text-sm">Alpha <span className='text-white'>{validator.alphaPercentage}</span></span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: '99.98%' }}
                ></div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#A8A8A8] text-sm">REP <span className='text-white'>{validator.repWeighted1}</span> weighted</span>
                  <img src={infoIcon} alt="info" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#A8A8A8] text-sm">REP <span className='text-white'>{validator.repWeighted2}</span> weighted</span>
                  <img src={infoIcon} alt="info" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 rounded-lg p-1">
            {tabs.map(({tab, icon}: {tab: string, icon: React.ReactNode}) => (
              
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 flex items-center rounded-[12px] gap-2 text-sm font-medium transition-colors ${activeTab === tab
                  ? 'bg-gradient-to-b from-[#7CFFB5] to-[#00FF6F]  text-black'
                  : 'text-[#939494] bg-[#0C0C0C] border-[0.2px] border-[#5E5E5E40]  hover:text-white hover:bg-[#090909]'
                  }`}
              >
                {icon}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-[#090909] rounded-lg overflow-hidden">
          {/* Table Header with Rows Selector */}
          <div className="flex justify-between items-center p-4 border-b border-[#1a1a1a]">
            <h3 className="text-lg font-semibold text-white">
              {activeTab} Data
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[#A8A8A8] text-sm">Rows</span>
              <div className="flex gap-1">
                {rowOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setRowsPerPage(option)}
                    className={`px-3 py-1 rounded text-sm font-medium ${rowsPerPage === option
                      ? 'bg-gradient-to-b from-[#7CFFB5] to-[#00FF6F] text-black'
                      : 'text-[#A8A8A8] hover:text-white hover:bg-[#0C0C0C]'
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0C0C0C]">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-white">Rank</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Type</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Hotkey</th>
                  <th className="px-6 py-4 text-left font-medium text-white">CT Take</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Proportion</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Subnet Weight</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Noms</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Family Weight</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Family Balance</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Dominance</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Divs</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.slice(0, rowsPerPage).map((row) => (
                  <tr key={row.rank} className="border-b border-[#1a1a1a] hover:bg-[#0C0C0C]">
                    <td className="px-6 py-4 text-sm text-white font-medium">{row.rank}</td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A8A8A8]">
                      <div className="w-16 h-4 bg-[#2B2B2B] rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#0C0C0C] rounded"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-[#333333] text-white rounded">
                {currentPage}
              </button>
              <button
                className="px-3 py-1 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#0C0C0C] rounded"
              >
                2
              </button>
              <button
                className="px-3 py-1 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#0C0C0C] rounded"
              >
                Next
              </button>
            </div>
            <div className="text-sm text-[#A8A8A8]">
              Showing 1 to {Math.min(rowsPerPage, performanceData.length)} of {performanceData.length} entries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
