import { LineChart } from "@/components/Chart/LineChart";
import { CoinList } from "@/components/Chart/Coin/CoinList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  gap: 30px;
`;

export const ChartWrapper = () => {
  return (
    <>
      <Wrapper>
        <LineChart />
        <CoinList />
      </Wrapper>
    </>
  );
};
