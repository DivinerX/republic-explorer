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
import backImg from '/back.svg'

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
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#22c55e',
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
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
          label: function (context: any) {
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
          callback: function (value: any) {
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
        <div className="relative mb-8 bg-[#0C0C0C] rounded-lg p-8 bg-gradient-to-b from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.25)], url('/back.png') mix-blend-mode-screen">
          {/* Circular Chart */}
          {/* <img src={backImg} className="absolute top-0 left-0 opacity-70 h-full"/> */}
          <div className="relative w-80 h-80 mx-auto">
            <div className="flex justify-between text-[32px] font-light ">
              <span>60%</span>
              <span>40%</span>
            </div>
            <svg
              className="w-full h-full transform -rotate-90 -mt-5"
              viewBox="0 0 200 200"
            >
              {/* Glow Filter Definitions */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feColorMatrix in="coloredBlur" type="matrix" values="0 0 0 0 0.13  0 0 0 0 0.77  0 0 0 0 0.33  0 0 0 0.8 0" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Background Circle */}

              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                filter="url(#glow)"

              />
              {/* Staked Portion */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#22c55e"
                strokeWidth="5"
                strokeDasharray={`${stakedPercentage * 5.02} 502`}
                strokeDashoffset="0"
                filter="url(#greenGlow)"
              />
            </svg>
          </div>

          <div className="absolute top-20 left-[10%]">
            <div className="text-[24px] font-light">Circulating Supply</div>
            <div className="text-[32px] font-medium">420,000,000 REP</div>
            <div className="text-[24px] font-light bg-gradient-to-r from-[#7CFFB5] to-[#00FF6F] bg-clip-text text-transparent">Supply Staked</div>
            <div className="text-[32px] font-medium bg-gradient-to-r from-[#7CFFB5] to-[#00FF6F] bg-clip-text text-transparent">168,000,000 REP</div>
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
                    className={`px-4 py-2 rounded text-sm font-medium ${selectedTimeRange === range
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
            <div className="h-80 bg-[#0D0F0F] rounded-lg p-6 relative">
              {/* Glow effect overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full" style={{
                  filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 20px rgba(34, 197, 94, 0.2)) drop-shadow(0 0 30px rgba(34, 197, 94, 0.1))'
                }}>
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
