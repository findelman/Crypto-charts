import { useState, useEffect } from "react";

interface ICoinData {
  name: string;
  image: {
    small: string;
  };
  market_data: {
    current_price: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
  };
}

export const useGetCoin = (coinId: string): { coinData: ICoinData | null; isLoading: boolean } => {
  const [coinData, setCoinData] = useState<ICoinData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const data = await response.json();
        setCoinData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setCoinData(null);
        setIsLoading(false);
      }
    })();
  }, [coinId]);

  return { coinData, isLoading };
};