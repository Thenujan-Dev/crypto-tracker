import React from "react";
import { MdWifiTethering, MdArrowOutward } from "react-icons/md";
import { useGlobalContext } from "../context/coinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurr } = useGlobalContext();

  const symbols: Record<"usd" | "eur" | "inr", "$" | "€" | "₹"> = {
    usd: "$",
    eur: "€",
    inr: "₹",
  };

  const currencyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "usd" | "eur" | "inr";
    setCurr({ currency: value, symbol: symbols[value] });
  };

  return (
    <div className="text-white w-full border-b border-b-slate-400 p-3">
      <div className="flex items-center justify-between w-[80%] mx-auto">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-1.5">
          <MdWifiTethering className="text-4xl font-bold" />
          <span className="text-2xl font-bold">Cryptoplace</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-3">
          <Link to={"/"}>
            {" "}
            <li className="list-none cursor-pointer text-xl">Home</li>
          </Link>
          <li className="list-none cursor-pointer text-xl">Features</li>
          <li className="list-none cursor-pointer text-xl">Pricing</li>
          <li className="list-none cursor-pointer text-xl">Blog</li>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Currency Selector */}
          <select
            className="border-2 px-3 border-white rounded-md bg-blue-900"
            onChange={currencyHandler}
          >
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
            <option value="inr">INR (₹)</option>
          </select>

          {/* Sign Up Button */}
          <div className="flex items-center cursor-pointer text-xl gap-1.5 bg-white text-black px-2 rounded-md">
            <button type="button">Sign Up</button>
            <MdArrowOutward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
