import { LineChart } from "@/components/Charts/LineChart";
import { CoinList } from "@/components/Coin/CoinList";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
`;

export const Container = () => {
  return (
    <Wrapper>
      <LineChart />
      <CoinList />
    </Wrapper>
  );
};
