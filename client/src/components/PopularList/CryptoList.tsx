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

//     {
//         "id": "bitcoin",
//         "symbol": "btc",
//         "name": "Bitcoin",
//         "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//         "current_price": 26746,
//         "market_cap": 518828749621,
//         "market_cap_rank": 1,
//         "fully_diluted_valuation": 561418722465,
//         "total_volume": 7956340205,
//         "high_24h": 26936,
//         "low_24h": 26333,
//         "price_change_24h": 347.35,
//         "price_change_percentage_24h": 1.31577,
//         "market_cap_change_24h": 5890114706,
//         "market_cap_change_percentage_24h": 1.14831,
//         "circulating_supply": 19406912,
//         "total_supply": 21000000,
//         "max_supply": 21000000,
//         "ath": 69045,
//         "ath_change_percentage": -61.28081,
//         "ath_date": "2021-11-10T14:24:11.849Z",
//         "atl": 67.81,
//         "atl_change_percentage": 39324.81718,
//         "atl_date": "2013-07-06T00:00:00.000Z",
//         "roi": null,
//         "last_updated": "2023-06-19T23:27:37.715Z",
//         "price_change_percentage_24h_in_currency": 1.3157662201463736
//     },
//     {
//         "id": "ethereum",
//         "symbol": "eth",
//         "name": "Ethereum",
//         "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
//         "current_price": 1734.67,
//         "market_cap": 208417377736,
//         "market_cap_rank": 2,
//         "fully_diluted_valuation": 208417377736,
//         "total_volume": 5736683038,
//         "high_24h": 1742.88,
//         "low_24h": 1710.84,
//         "price_change_24h": 12.53,
//         "price_change_percentage_24h": 0.72769,
//         "market_cap_change_24h": 1333415139,
//         "market_cap_change_percentage_24h": 0.6439,
//         "circulating_supply": 120208826.30512,
//         "total_supply": 120208826.30512,
//         "max_supply": null,
//         "ath": 4878.26,
//         "ath_change_percentage": -64.46063,
//         "ath_date": "2021-11-10T14:24:19.604Z",
//         "atl": 0.432979,
//         "atl_change_percentage": 400312.9009,
//         "atl_date": "2015-10-20T00:00:00.000Z",
//         "roi": {
//             "times": 85.71875634802049,
//             "currency": "btc",
//             "percentage": 8571.875634802049
//         },
//         "last_updated": "2023-06-19T23:27:40.560Z",
//         "price_change_percentage_24h_in_currency": 0.727692821644474
//     },
//     {
//         "id": "tether",
//         "symbol": "usdt",
//         "name": "Tether",
//         "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
//         "current_price": 0.999899,
//         "market_cap": 83120460618,
//         "market_cap_rank": 3,
//         "fully_diluted_valuation": 83120460618,
//         "total_volume": 13925542655,
//         "high_24h": 1.003,
//         "low_24h": 0.994549,
//         "price_change_24h": -0.00047963309887622,
//         "price_change_percentage_24h": -0.04795,
//         "market_cap_change_24h": -116522203.40466309,
//         "market_cap_change_percentage_24h": -0.13999,
//         "circulating_supply": 83173876278.0865,
//         "total_supply": 83173876278.0865,
//         "max_supply": null,
//         "ath": 1.32,
//         "ath_change_percentage": -24.46819,
//         "ath_date": "2018-07-24T00:00:00.000Z",
//         "atl": 0.572521,
//         "atl_change_percentage": 74.55391,
//         "atl_date": "2015-03-02T00:00:00.000Z",
//         "roi": null,
//         "last_updated": "2023-06-19T23:25:00.315Z",
//         "price_change_percentage_24h_in_currency": -0.04794513938421967
//     },

