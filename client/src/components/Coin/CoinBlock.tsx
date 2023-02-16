import { getActiveToken, usesetActiveToken } from "@/store/token";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

export const CoinBlock = ({ coinId }: { coinId: string }) => {
  const activeToken = useSelector(getActiveToken);

  const coinData = useGetCoin(coinId);
  const changeCoin = usesetActiveToken();

  return (
    <>
      {coinData ? (
        <Wrapper
          isActive={coinData.name.toLowerCase() === activeToken}
          onClick={() => {
            changeCoin(coinData.name.toLowerCase());
          }}
        >
          <h2>{coinData.name}</h2>
          <div>Symbol: {coinData.symbol}</div>
          <div>Price: ${coinData.market_data.current_price.usd}</div>
          <div>Market Cap: ${coinData.market_data.market_cap.usd}</div>
        </Wrapper>
      ) : (
        "Loading..."
      )}
    </>
  );
};
function getCoin(coinId: string) {
  throw new Error("Function not implemented.");
}

