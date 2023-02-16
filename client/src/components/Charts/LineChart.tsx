import useSWR from "swr";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getActiveToken } from "@/store/token";
import { useSelector } from "react-redux";

import { fetcher } from "@/api/fetcher";
import styled from "styled-components";

Chart.register(CategoryScale);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Wrapper = styled.div`
  width: 80vw;
`;

export const LineChart = () => {
  const currency = "usd";
  const activeToken = useSelector(getActiveToken);
  const { data } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${activeToken}/market_chart?vs_currency=${currency}&days=7&interval=daily`,
    fetcher
  );

  console.log(data);

  return (
    <Wrapper>
      <h2>
        {activeToken.toUpperCase()} {currency.toUpperCase()}
      </h2>
      {data && (
        <Line
          options={options}
          data={{
            labels: data?.prices?.map((priceData: any) => {
              const date = new Date(priceData[0]);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }),
            datasets: [
              {
                data: data?.prices?.map((priceData: any) => priceData[1]),
              },
            ],
          }}
        />
      )}
    </Wrapper>
  );
};
