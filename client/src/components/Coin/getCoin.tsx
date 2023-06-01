import { useState, useEffect } from "react";

export const useGetCoin = (coinId: string) => {
  const [coinData, setCoinData] = useState<null | any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        const data = await response.json();
        console.log(data)
        setCoinData(data);
      }
      catch (err) {
        console.log(err)
      }
    })();
  }, [coinId]);

  return coinData;
};
