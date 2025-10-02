import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/coinContext";
import LineChart from "./LineChart";
import type { HistoricalData } from "../crypto";

const SingleCoin = () => {
  const { id } = useParams();
  const { curr } = useGlobalContext();
  const [coinData, setCoinData] = useState<any>();
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    prices: [],
    market_caps: [],
    total_volumes: [],
  });

  const fetchSingleData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-7UZzJGoS9zn81G1ok2wxscC5" },
      });
      const data = await res.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${curr.currency}&days=7`,
        {
          method: "GET",
          headers: { "x-cg-demo-api-key": "CG-7UZzJGoS9zn81G1ok2wxscC5" },
        }
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSingleData();
    fetchChartData();
  }, [curr]);

  if (!coinData) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-b-purple-600 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-900/80 p-6 rounded-2xl shadow-xl text-white">
        <img
          src={coinData.image.large}
          alt={coinData.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </h1>
          <p className="text-lg md:text-xl">
            Current Price: {curr.symbol}{" "}
            {coinData.market_data.current_price[curr.currency].toLocaleString()}
          </p>
          <p className="text-gray-300">
            24h Change:{" "}
            <span
              className={
                coinData.market_data.price_change_percentage_24h > 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
          <p className="text-gray-300">
            Market Cap: {curr.symbol}{" "}
            {coinData.market_data.market_cap[curr.currency].toLocaleString()}
          </p>
        </div>
      </div>

      <LineChart historicalData={historicalData} />
    </div>
  );
};

export default SingleCoin;
