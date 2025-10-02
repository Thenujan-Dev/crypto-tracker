import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/coinContext";
import { useNavigate } from "react-router-dom";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_24h: number;
  market_cap: number;
}

const Homepage = () => {
  const { allCoins, curr } = useGlobalContext();
  const [displayCoins, setDisplayCoins] = useState<Coin[]>([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayCoins(filtered.length ? filtered : allCoins);
  };

  return (
    <div className="mt-12 px-6 text-gray-900">
      {/* Heading */}
      <div className="flex flex-col gap-5 items-center text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-md">
          Largest Crypto Marketplace
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Welcome to the world’s largest cryptocurrency marketplace. <br />
          Sign up to explore and trade your favorite coins 🚀
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-8">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/90 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-4 py-2 w-full max-w-lg"
        >
          <input
            className="flex-grow px-3 py-2 rounded-l-full border-none outline-none text-gray-700 bg-transparent placeholder-gray-400"
            type="text"
            placeholder="🔍 Search crypto..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            list="coin"
          />
          <datalist id="coin">
            {allCoins.map((d, i) => (
              <option key={i} value={d.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all hover:scale-105"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-12">
        <table className="w-full max-w-6xl mx-auto border border-gray-200 rounded-2xl shadow-xl overflow-hidden backdrop-blur">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Coin
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                24h Change
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {displayCoins.slice(0, 10).map((d, i) => (
              <tr
                key={i}
                onClick={() => navigate(`/coin/${d.id}`)}
                className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 transition duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 text-gray-600 font-medium">
                  {d.market_cap_rank}
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-8 h-8 rounded-full shadow-sm border border-gray-200"
                  />
                  <span className="font-semibold text-gray-800">{d.name}</span>
                  <span className="uppercase text-gray-500 text-sm">
                    ({d.symbol})
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {curr.symbol} {d.current_price.toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    d.price_change_24h > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {d.price_change_24h > 0 ? "▲" : "▼"}{" "}
                  {d.price_change_24h.toFixed(2)}%
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {curr.symbol} {d.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Homepage;
