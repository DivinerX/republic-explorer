import { useState } from 'react';
import validator from "/validator.svg";
import crypto_node from "/crypto_node.svg";
import safe_stake from "/safe_stake.svg";
import crypto_lord from "/crypto_lord.svg";
import rep_delegator from "/rep_delegator.svg";
import rep_master from "/rep_master.svg";

interface DelegationData {
  id: number;
  delegator: {
    name: string;
    icon: string;
    color: string;
  };
  validator: string;
  amount: string;
  time: string;
  transaction: string;
}

const sampleData: DelegationData[] = [
  {
    id: 1,
    delegator: { name: "Validator X", icon: validator, color: "bg-red-500" },
    validator: "0xabcd...89ef",
    amount: "150.345 REP",
    time: "45 secs",
    transaction: "0xc2b7...f1da"
  },
  {
    id: 2,
    delegator: { name: "Crypto Node", icon: crypto_node, color: "bg-blue-500" },
    validator: "0x1234...ef56",
    amount: "200.5 REP",
    time: "50 secs",
    transaction: "0xb0a6...e0f5"
  },
  {
    id: 3,
    delegator: { name: "Safe Stake", icon: safe_stake, color: "bg-green-500" },
    validator: "0xabcd...89ef",
    amount: "1000 REP",
    time: "2 mins",
    transaction: "0x3d6e...de8a"
  },
  {
    id: 4,
    delegator: { name: "Crypto Lord", icon: crypto_lord, color: "bg-purple-600" },
    validator: "0x5678...ijkl",
    amount: "500 REP",
    time: "30 mins",
    transaction: "0xa5e0...4326"
  },
  {
    id: 5,
    delegator: { name: "Rep Delegator", icon: rep_delegator, color: "bg-gray-600" },
    validator: "0xabcd...89ef",
    amount: "2500.456 REP",
    time: "35 mins",
    transaction: "0xce8a...b8d1"
  },
  {
    id: 6,
    delegator: { name: "Rep Master", icon: rep_master, color: "bg-green-600" },
    validator: "0x1234...ef56",
    amount: "750.24 REP",
    time: "50 mins",
    transaction: "0x3a2e...24e9"
  }
];

export default function Delegation() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 6;
  const totalPages = 138843;

  return (
    <div className="min-h-screen text-white p-6">
      <div className="px-8 mx-auto">
        
        {/* Table */}
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#090909]">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-white">Delegator</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Validator</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Amount</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Time</th>
                  <th className="px-6 py-4 text-left font-medium text-white">Transaction</th>
                </tr>
              </thead>
              <tbody className="">
                {sampleData.map((item) => (
                  <tr key={item.id} className="bg-[#0C0C0C] text-[#A8A8A8]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={item.delegator.icon} alt={item.delegator.name} className="w-8 h-8 rounded-full mr-3" />
                        <span className="text-sm font-medium">{item.delegator.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.validator}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.transaction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2 bg-[#0D0F0F] px-2 py-1 rounded-md">
            <button 
              className="px-2 py-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="px-2 my-2 text-sm bg-[#333333] text-white rounded">
              1
            </button>
            <button className="px-2 py-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              2
            </button>
            <button className="px-2 py-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              3
            </button>
            <span className="px-2 text-[#A8A8A8]">...</span>
            <button className="px-2 py-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded">
              {totalPages.toLocaleString()}
            </button>
            <button 
              className="px-2 py-2 text-sm text-[#A8A8A8] hover:text-white hover:bg-[#090909] rounded"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-[#A8A8A8]">
            Showing 1 to {entriesPerPage} entries
          </div>
        </div>
      </div>
    </div>
  );
}
