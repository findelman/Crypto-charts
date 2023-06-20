import useSWR from "swr";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useUser } from "@/store/user";
import { ChartOptions } from "chart.js";
import { fetcher } from "@/api/fetcher";
import styled from "styled-components";
import { ChangeCurrency } from "./ChangeCurrency";
import { FlexAiC } from "@/styles/Constructors";
import { useState, useEffect } from "react";
import { Loader } from "../Common/Lodaer";

Chart.register(CategoryScale);

const options: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
    axis: "x",
  },
};

const Wrapper = styled.div`
  width: 80vw;
`;

export const LineChart = () => {
  const { activeToken, currency } = useUser();
  const { data, isLoading } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${activeToken}/market_chart?vs_currency=${currency}&days=8&interval=daily`,
    fetcher
  );

  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  console.log(data?.prices);

  useEffect(() => {
    setIsLoadingData(isLoading);
  }, [isLoading]);

  return (
    <Wrapper>
      <FlexAiC>
        <h2>{activeToken.toUpperCase()} </h2>
        <ChangeCurrency />
      </FlexAiC>
      {isLoadingData ? (
        <Loader />
      ) : (
        data && (
          <Line
            options={options}
            data={{
              labels: data?.prices?.slice(0, -1).map((priceData: any) => {
                const date = new Date(priceData[0]);
                console.log(date);
                return `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`;
              }),
              datasets: [
                {
                  data: data?.prices
                    ?.slice(0, -1)
                    .map((priceData: any) => priceData[1]),
                  fill: true,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            }}
          />
        )
      )}
    </Wrapper>
  );
};
