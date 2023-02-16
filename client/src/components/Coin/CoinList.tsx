import styled from "styled-components";
import { CoinBlock } from "./CoinBlock";

const Coins = ["bitcoin", "ethereum", "shibacash", "greed"];

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
`;

export const CoinList = () => {
  return (
    <Wrapper>
      {Coins.map((item) => {
        return <CoinBlock key={item} coinId={item} />;
      })}
    </Wrapper>
  );
};
