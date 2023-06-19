import { fetcher } from "@/api/fetcher";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useSWR from "swr";

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const CryptoListWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

const CryptoMarquee = styled.div`
  display: flex;
  animation: ${marqueeAnimation} 20s linear infinite;
`;

const CryptoCard = styled.div`
  width: 250px;
  margin-right: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const CryptoName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const CryptoPrice = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CryptoMarketCap = styled.p`
  font-size: 14px;
  color: #888;
`;

export const CryptoList = ({ cryptoList }: any) => {
  return (
    <>
      {cryptoList ? (
        <CryptoListWrapper>
          <CryptoMarquee>
            {cryptoList?.map((crypto: any) => (
              <CryptoCard key={crypto.id}>
                <CryptoName>{crypto.name}</CryptoName>
                <CryptoPrice>Price: ${crypto.current_price}</CryptoPrice>
                <CryptoMarketCap>
                  Market Cap: ${crypto.market_cap.toLocaleString()}
                </CryptoMarketCap>
              </CryptoCard>
            ))}
          </CryptoMarquee>
        </CryptoListWrapper>
      ) : (
        <div>Загрузка данных...</div>
      )}
    </>
  );
};
