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

export default function Tokenomics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");

  const circulatingSupply = "420,000,000";
  const supplyStaked = "168,000,000";
  const emissionRate = "2 REP / block ~ 14,400 REP / day";
  const stakedPercentage = 40;
  const unstakedPercentage = 60;

  const timeRanges = ["7d", "30d", "90d", "180d", "1y"];

  // Supply trend data for different time ranges
  const supplyTrendData = {
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [410000, 412000, 408000, 415000, 418000, 420000, 420000]
    },
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [380000, 395000, 405000, 420000]
    },
    '90d': {
      labels: ['Month 1', 'Month 2', 'Month 3'],
      data: [320000, 370000, 420000]
    },
    '180d': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
      data: [250000, 280000, 320000, 360000, 390000, 420000]
    },
    '1y': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      data: [150000, 250000, 350000, 420000]
    }
  };

  const currentData = supplyTrendData[selectedTimeRange as keyof typeof supplyTrendData];

  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Supply (REP)',
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
            return `Supply: ${context.parsed.y.toLocaleString()} REP`;
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl text-white">Tokenomics</h1>
        </div>

        {/* Key Metrics Cards */}
        <div className="flex gap-6 mb-8">
          {/* Circulating Supply Card */}
          <div className="bg-[#090909] w-1/4 rounded-lg p-6 flex flex-col justify-center items-center">
            <div>
              <div className="text-xl text-[#A8A8A8] mb-1">
                Circulating Supply
              </div>
              <div className="text-2xl text-white">{circulatingSupply} REP</div>
            </div>
          </div>

          {/* Supply Staked Card */}
          <div className="bg-[#090909] w-1/4 rounded-lg p-6 flex flex-col justify-center items-center">
            <div>
              <div className="text-xl text-[#A8A8A8] mb-1">Supply Staked</div>
              <div className="text-2xl text-white">{supplyStaked} REP</div>
            </div>
          </div>

          {/* Emission Rate Card */}
          <div className="bg-[#090909] w-1/2 rounded-lg p-6 flex flex-col justify-center items-center">
            <div>
              <div className="text-xl text-[#A8A8A8] mb-1">Emission Rate</div>
              <div className="text-2xl text-white">{emissionRate}</div>
            </div>
          </div>
        </div>

        {/* Circular Progress Chart */}
        <div className="mb-8">
          <div className="bg-[#090909] rounded-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-8 lg:mb-0">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Supply Distribution
                </h3>

                {/* Circular Chart */}
                <div className="relative w-80 h-80 mx-auto">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 200 200"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="20"
                    />
                    {/* Staked Portion */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="20"
                      strokeDasharray={`${stakedPercentage * 5.02} 502`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    {/* Center Circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="50"
                      fill="#090909"
                      stroke="#333"
                      strokeWidth="2"
                    />
                    {/* Percentage Text */}
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-3xl font-bold fill-white"
                    >
                      {stakedPercentage}%
                    </text>
                    <text
                      x="100"
                      y="120"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm fill-[#A8A8A8]"
                    >
                      Staked
                    </text>
                  </svg>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex-1 lg:ml-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white rounded-full mr-4"></div>
                    <div>
                      <div className="text-white font-medium">
                        Circulating Supply
                      </div>
                      <div className="text-[#A8A8A8] text-sm">
                        {circulatingSupply} REP
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                    <div>
                      <div className="text-white font-medium">
                        Supply Staked
                      </div>
                      <div className="text-[#A8A8A8] text-sm">
                        {supplyStaked} REP
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#333]">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {unstakedPercentage}%
                        </div>
                        <div className="text-sm text-[#A8A8A8]">Unstaked</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-500">
                          {stakedPercentage}%
                        </div>
                        <div className="text-sm text-[#A8A8A8]">Staked</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Graph Section */}
        <div className="mb-8">
          <div className="bg-[#090909] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Supply Trend</h3>

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

            {/* Supply Trend Chart */}
            <div className="h-80 bg-[#0D0F0F] rounded-lg p-6">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
