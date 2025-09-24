import { type FC } from "react";
import wirefooty from "/wirefooty.svg";
import logo from "/logo.svg";
import x from "/x.svg";
import github from "/github.svg";
import discord from "/discord.svg";
import whitepaper from "/whitepaper.svg";

const Footer: FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <img src={wirefooty} alt="wirefooty" className="w-full" />
        <img
          src="/footvector.svg"
          alt="footvector"
          className="w-full -mt-[305px]"
        />
      </div>
      <div className="px-32 py-6 -mt-64 flex flex-row justify-between">
        <div>
          <div className="flex flex-row items-center gap-2">
            <img src={logo} alt="logo" />
            <h2 className="text-[#DDF4FF] text-2xl">Republic AI</h2>
          </div>
          <span className="text-[#DDF4FFBF] px-2">
            Powering the new order of computing
          </span>
          <div className="flex flex-row items-center gap-2">
            <RoundLink icon={x} href="https://twitter.com/republicai" />
            <RoundLink icon={github} href="https://github.com/republicai" />
            <RoundLink icon={discord} href="https://discord.com/republicai" />
            <RoundLink
              icon={whitepaper}
              href="https://whitepaper.com/republicai"
            />
          </div>
          <div className="mt-4">
            <span className="text-[#DDF4FFBF] text-xs">
              Copyright © 2025 IGCF. All rights reserved.
            </span>
          </div>
        </div>
        <div className="flex flex-row text-[#DDF4FFBF] gap-16 text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-[#DDF4FFBF]">Getting Started</span>
            <span className="text-[#DDF4FFBF]">API Reference</span>
            <span className="text-[#DDF4FFBF]">Integrations</span>
            <span className="text-[#DDF4FFBF]">SDKs</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#DDF4FFBF]">Changelog</span>
            <span className="text-[#DDF4FFBF]">Validator Quickstart</span>
            <span className="text-[#DDF4FFBF]">Client Quickstart</span>
            <span className="text-[#DDF4FFBF]">Whitepaper</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#DDF4FFBF]">Documentation</span>
            <span className="text-[#DDF4FFBF]">Whitepaper</span>
            <span className="text-[#DDF4FFBF]">Block Explorer</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#DDF4FFBF]">Privacy Policy</span>
            <span className="text-[#DDF4FFBF]">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoundLink = ({ icon, href }: { icon: string; href: string }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-[#101010] border border-[0.5px] border-[#5E5E5E80]"
    >
      <img src={icon} alt="icon" />
    </a>
  );
};

export default Footer;
