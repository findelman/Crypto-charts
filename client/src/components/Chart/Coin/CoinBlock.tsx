import { useSetUser, useUser } from "@/store/user";
import { FlexAiC } from "@/styles/Constructors";
import React from "react";
import styled from "styled-components";
import { useGetCoin } from "./getCoin";

const Wrapper = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background: ${({ isActive }) => (isActive ? "black" : "transparent")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
`;

const Header = styled(FlexAiC)`
  margin-bottom: 10px;
  img {
    width: 30px;
    height: 30px;
  }
  h2 {
    margin-left: 5px;
  }
`;

export const CoinBlock = ({
  coinId,
  searchResult,
}: {
  coinId?: string;
  searchResult?: any;
}) => {
  const { activeToken, currency } = useUser();

  const { _setActiveToken } = useSetUser();

  const { coinData, isLoading } = coinId
    ? useGetCoin(coinId)
    : { coinData: searchResult, isLoading: false };

  const coinImage = coinId ? coinData?.image.small : coinData.image;

  return (
    <>
      {isLoading
        ? "Loading..."
        : coinData && (
            <Wrapper
              isActive={coinData.name.toLowerCase() === activeToken}
              onClick={() => {
                _setActiveToken(coinData.name.toLowerCase());
              }}
            >
              <Header>
                <img src={coinImage} alt="" />
                <h2>{coinData.name}</h2>
              </Header>
              <div>
                Price: {currency.toUpperCase()} {coinData.current_price}
              </div>
              <div>
                Market Cap: {currency.toUpperCase()} {coinData.market_cap}
              </div>
            </Wrapper>
          )}
    </>
  );
};
