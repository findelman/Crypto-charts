import styled, { keyframes } from "styled-components";

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const CryptoListWrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  padding: 20px;
`;

const CryptoMarquee = styled.div`
  display: flex;
  width: fit-content;
  animation: ${marqueeAnimation} 90s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const CryptoCard = styled.div`
  width: 250px;
  margin-right: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: 200ms linear;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const CryptoName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CryptoPrice = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CryptoMarketCap = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
`;

const CryptoAdditionalData = styled.p<{ positive?: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.positive ? "#008000" : "#FF0000")};
`;

export const CryptoList = ({ cryptoList }: any) => {
  const extendedCryptoList = Array.isArray(cryptoList)
    ? [...cryptoList, ...cryptoList]
    : [];

  return (
    <>
      {cryptoList ? (
        <CryptoListWrapper>
          <CryptoMarquee>
            {extendedCryptoList?.map((crypto: any) => (
              <CryptoCard key={crypto.id}>
                <CryptoName>{crypto.name}</CryptoName>
                <CryptoPrice>Price: ${crypto.current_price}</CryptoPrice>
                <CryptoMarketCap>
                  Market Cap: ${crypto.market_cap.toLocaleString()}
                </CryptoMarketCap>
                <CryptoAdditionalData
                  positive={crypto.price_change_percentage_24h > 0}
                >
                  24h Price Variation: {crypto.price_change_percentage_24h}%
                </CryptoAdditionalData>
                <p>
                  Trading Volume: {crypto.total_volume}{" "}
                  {crypto.symbol.toUpperCase()}
                </p>
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
