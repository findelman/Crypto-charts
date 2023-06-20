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

  const { coinData, isLoading } = useGetCoin(
    coinId || (searchResult && searchResult.id)
  );

  const coinImage = coinData?.image.small;
  const coinPrice = coinData?.market_data?.current_price[currency];
  const coinMarketCap = coinData?.market_data?.market_cap[currency];

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
                <h2>
                  {coinData.name} / {currency.toUpperCase()}
                </h2>
              </Header>
              <div>Price: {coinPrice}</div>
              <div>Market Cap: {coinMarketCap}</div>
            </Wrapper>
          )}
    </>
  );
};
