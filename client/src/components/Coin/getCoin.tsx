import { useState, useEffect } from "react";

export const useGetCoin = (coinId: string) => {
  const [coinData, setCoinData] = useState<null | any>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await response.json();
      setCoinData(data);
    })();
  }, [coinId]);

  return coinData;
};
