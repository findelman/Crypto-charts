import useSWR from "swr";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSetUser, useUser } from "@/store/user";
import { ChartOptions } from "chart.js";
import { fetcher } from "@/api/fetcher";
import styled from "styled-components";
import { ChangeCurrency } from "./ChangeCurrency";
import { FlexAiC, JC_SB } from "@/styles/Constructors";
import { useState, useEffect } from "react";
import { Loader } from "../Common/Lodaer";
import { DateDropdown } from "./DateDropDown";

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

const TabS = styled.button<{ isActive?: boolean }>`
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: bold;
  ${({ isActive }) =>
    isActive &&
    `
    background: black;
    color: white;
  `}
`;

const Tab = ({ text }) => {
  const { _setInterval } = useSetUser();
  const { interval } = useUser();
  return (
    <TabS
      isActive={interval === text.toLowerCase()}
      onClick={() => {
        _setInterval(text.toLowerCase());
      }}
    >
      {text.slice(0, 1)}
    </TabS>
  );
};

const INTERVAL = ["DAILY", "MONTHLY"];

const TabsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 15px;
  padding: 8px;
  border-radius: 20px;
  border: 2px solid black;
`;

export const LineChart = () => {
  const { activeToken, currency, days, interval } = useUser();
  const { data, isLoading } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${activeToken}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`,
    fetcher
  );

  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  console.log(data?.prices);

  useEffect(() => {
    setIsLoadingData(isLoading);
  }, [isLoading]);

  return (
    <Wrapper>
      <JC_SB>
        <FlexAiC>
          <h2>{activeToken.toUpperCase()} </h2>
          <ChangeCurrency />
        </FlexAiC>
        <TabsWrapper>
          {INTERVAL.map((item) => {
            return <Tab key={item} text={item} />;
          })}
          <DateDropdown />
        </TabsWrapper>
      </JC_SB>
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
