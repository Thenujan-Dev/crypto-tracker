import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

// Currency types
type CurrencyType = "usd" | "eur" | "inr";
type SymbolType = "$" | "€" | "₹";

// Coin type (simplified; you can extend with actual API response fields)
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_24h: number;
  market_cap: number;
  // ... add more fields if you want
}

type CurrState = {
  currency: CurrencyType;
  symbol: SymbolType;
};

type CoinContextType = {
  allCoins: Coin[];
  setAllCoins: Dispatch<SetStateAction<Coin[]>>;
  curr: CurrState;
  setCurr: Dispatch<SetStateAction<CurrState>>;
};

const AppContext = createContext<CoinContextType | null>(null);

interface CoinProviderProps {
  children: ReactNode;
}

const CoinProvider: React.FC<CoinProviderProps> = ({ children }) => {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [curr, setCurr] = useState<CurrState>({
    currency: "usd",
    symbol: "$",
  });

  const fetchDatas = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.currency}`;
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": "CG-7UZzJGoS9zn81G1ok2wxscC5" },
    };

    try {
      const response = await fetch(url, options);
      const data: Coin[] = await response.json();
      setAllCoins(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [curr]);

  return (
    <AppContext.Provider value={{ allCoins, setAllCoins, curr, setCurr }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useGlobalContext must be used inside <CoinProvider>");
  }
  return context;
};

export { CoinProvider, useGlobalContext };
