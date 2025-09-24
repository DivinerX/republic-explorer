import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/logo.svg";
import search from "/search.svg";

const Header: FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="flex flex-row justify-between items-center px-32 py-6">
            <div className="flex flex-row items-center gap-4">
                <img src={logo} alt="logo" />
                <h2 className="text-[#DDF4FF] font-bold">Republic</h2>
            </div>
            <div className="flex flex-row justify-between items-center gap-6 text-sm">
                <Link to="/delegation" className={isActive("/delegation") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Delegation</Link>
                <Link to="/wallet" className={isActive("/wallet") ? "text-[#DDF4FF]" : "text-gray-400"}>Wallet</Link>
                <Link to="/validators" className={isActive("/validators") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Validators</Link>
                <Link to="/tokenomics" className={isActive("/tokenomics") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Tokenomics</Link>
                <Link to="/blocks" className={isActive("/blocks") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Blocks</Link>
                <Link to="/transfers" className={isActive("/transfers") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Transfers</Link>
                <Link to="/wallets" className={isActive("/wallets") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Wallets</Link>
                <Link to="/transactions" className={isActive("/transactions") ? "text-[#DDF4FF] font-bold" : "text-gray-400"}>Transactions</Link>
            </div>
            <div>
                <button className="bg-[#222222] text-[#A8A8A8] px-6 py-3 rounded-md flex flex-row items-center gap-2 text-sm">
                    <img src={search} alt="search" /> Search
                </button>
            </div>
        </header>
    );
};

export default Header;