import styled from "styled-components";
import { CoinBlock } from "./CoinBlock";
import { SearchBox } from "../SearchCoin/SearchBox";

const Coins = ["bitcoin", "ethereum", "shibacash", "cardano",'solana'];

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  gap: 10px;
`;



export const CoinList = () => {
  return (
    <Wrapper>
      <SearchBox />
      {Coins.map((item) => {
        return <CoinBlock key={item} coinId={item} />;
      })}
    </Wrapper>
  );
};
