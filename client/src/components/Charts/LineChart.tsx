import useSWR from "swr";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getActiveToken, useSetUser, useUser } from "@/store/user";
import { useSelector } from "react-redux";

import { fetcher } from "@/api/fetcher";
import styled from "styled-components";
import { useGetCurrencies } from "@/hooks/useGetCurrencies";
import { ChangeCurrency } from "../ChangeCurrency";
import { FlexAiC } from "@/styles/Constructors";

Chart.register(CategoryScale);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
    axis: "x",
    backgroundColor: "black",
    hover: {
      mode: "nearest",
      intersect: true,
      axis: "x",
      backgroundColor: "black",
    },
  },
};

const Wrapper = styled.div`
  width: 80vw;
`;

export const LineChart = () => {
  const { activeToken, currency } = useUser();
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${activeToken}/market_chart?vs_currency=${currency}&days=7&interval=daily`,
    fetcher
  );

  console.log(data);

  return (
    <Wrapper>
      <FlexAiC>
        <h2>{activeToken.toUpperCase()} </h2>
        <ChangeCurrency />
      </FlexAiC>
      {data && (
        <Line
          options={options}
          data={{
            labels: data?.prices?.map((priceData: any) => {
              const date = new Date(priceData[0]);
              console.log(date);
              return `${
                date.getMonth() + 1
              }/${date.getDate()}/${date.getFullYear()}`;
            }),
            datasets: [
              {
                data: data?.prices?.map((priceData: any) => priceData[1]),
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          }}
        />
      )}
    </Wrapper>
  );
};
