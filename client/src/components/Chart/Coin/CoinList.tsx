import styled from "styled-components";
import { CoinBlock } from "./CoinBlock";
import { useState } from "react";
import { debounce } from "@/utils/debonce";

// const test = [
//   {
//     id: "bitcoin",
//     symbol: "btc",
//     name: "Bitcoin",
//     image:
//       "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//     current_price: 26746,
//     market_cap: 518828749621,
//     market_cap_rank: 1,
//     fully_diluted_valuation: 561418722465,
//     total_volume: 7956340205,
//     high_24h: 26936,
//     low_24h: 26333,
//     price_change_24h: 347.35,
//     price_change_percentage_24h: 1.31577,
//     market_cap_change_24h: 5890114706,
//     market_cap_change_percentage_24h: 1.14831,
//     circulating_supply: 19406912.0,
//     total_supply: 21000000.0,
//     max_supply: 21000000.0,
//     ath: 69045,
//     ath_change_percentage: -61.28081,
//     ath_date: "2021-11-10T14:24:11.849Z",
//     atl: 67.81,
//     atl_change_percentage: 39324.81718,
//     atl_date: "2013-07-06T00:00:00.000Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:37.715Z",
//     price_change_percentage_24h_in_currency: 1.3157662201463736,
//   },
//   {
//     id: "ethereum",
//     symbol: "eth",
//     name: "Ethereum",
//     image:
//       "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
//     current_price: 1734.67,
//     market_cap: 208417377736,
//     market_cap_rank: 2,
//     fully_diluted_valuation: 208417377736,
//     total_volume: 5736683038,
//     high_24h: 1742.88,
//     low_24h: 1710.84,
//     price_change_24h: 12.53,
//     price_change_percentage_24h: 0.72769,
//     market_cap_change_24h: 1333415139,
//     market_cap_change_percentage_24h: 0.6439,
//     circulating_supply: 120208826.30512,
//     total_supply: 120208826.30512,
//     max_supply: null,
//     ath: 4878.26,
//     ath_change_percentage: -64.46063,
//     ath_date: "2021-11-10T14:24:19.604Z",
//     atl: 0.432979,
//     atl_change_percentage: 400312.9009,
//     atl_date: "2015-10-20T00:00:00.000Z",
//     roi: {
//       times: 85.71875634802049,
//       currency: "btc",
//       percentage: 8571.875634802049,
//     },
//     last_updated: "2023-06-19T23:27:40.560Z",
//     price_change_percentage_24h_in_currency: 0.727692821644474,
//   },
//   {
//     id: "tether",
//     symbol: "usdt",
//     name: "Tether",
//     image:
//       "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
//     current_price: 0.999899,
//     market_cap: 83120460618,
//     market_cap_rank: 3,
//     fully_diluted_valuation: 83120460618,
//     total_volume: 13925542655,
//     high_24h: 1.003,
//     low_24h: 0.994549,
//     price_change_24h: -0.00047963309887622,
//     price_change_percentage_24h: -0.04795,
//     market_cap_change_24h: -116522203.40466309,
//     market_cap_change_percentage_24h: -0.13999,
//     circulating_supply: 83173876278.0865,
//     total_supply: 83173876278.0865,
//     max_supply: null,
//     ath: 1.32,
//     ath_change_percentage: -24.46819,
//     ath_date: "2018-07-24T00:00:00.000Z",
//     atl: 0.572521,
//     atl_change_percentage: 74.55391,
//     atl_date: "2015-03-02T00:00:00.000Z",
//     roi: null,
//     last_updated: "2023-06-19T23:25:00.315Z",
//     price_change_percentage_24h_in_currency: -0.04794513938421967,
//   },
//   {
//     id: "binancecoin",
//     symbol: "bnb",
//     name: "BNB",
//     image:
//       "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
//     current_price: 242.81,
//     market_cap: 37833421048,
//     market_cap_rank: 4,
//     fully_diluted_valuation: 48549451053,
//     total_volume: 382179969,
//     high_24h: 244.29,
//     low_24h: 239.5,
//     price_change_24h: -0.839061708523019,
//     price_change_percentage_24h: -0.34437,
//     market_cap_change_24h: -246860622.19431305,
//     market_cap_change_percentage_24h: -0.64826,
//     circulating_supply: 155855196.0,
//     total_supply: 157900174.0,
//     max_supply: 200000000.0,
//     ath: 686.31,
//     ath_change_percentage: -64.62993,
//     ath_date: "2021-05-10T07:24:17.097Z",
//     atl: 0.0398177,
//     atl_change_percentage: 609546.33986,
//     atl_date: "2017-10-19T00:00:00.000Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:31.437Z",
//     price_change_percentage_24h_in_currency: -0.34436985474316023,
//   },
//   {
//     id: "usd-coin",
//     symbol: "usdc",
//     name: "USD Coin",
//     image:
//       "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
//     current_price: 0.999174,
//     market_cap: 28421590412,
//     market_cap_rank: 5,
//     fully_diluted_valuation: 28421418294,
//     total_volume: 3470545677,
//     high_24h: 1.005,
//     low_24h: 0.996216,
//     price_change_24h: -0.001363986276083917,
//     price_change_percentage_24h: -0.13633,
//     market_cap_change_24h: 79373622,
//     market_cap_change_percentage_24h: 0.28005,
//     circulating_supply: 28452864734.8091,
//     total_supply: 28452692427.6991,
//     max_supply: null,
//     ath: 1.17,
//     ath_change_percentage: -14.82757,
//     ath_date: "2019-05-08T00:40:28.300Z",
//     atl: 0.877647,
//     atl_change_percentage: 13.80689,
//     atl_date: "2023-03-11T08:02:13.981Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:39.682Z",
//     price_change_percentage_24h_in_currency: -0.13632523387593945,
//   },
//   {
//     id: "ripple",
//     symbol: "xrp",
//     name: "XRP",
//     image:
//       "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
//     current_price: 0.494977,
//     market_cap: 25730701194,
//     market_cap_rank: 6,
//     fully_diluted_valuation: 49494474574,
//     total_volume: 833064071,
//     high_24h: 0.498542,
//     low_24h: 0.485645,
//     price_change_24h: 0.00416153,
//     price_change_percentage_24h: 0.84788,
//     market_cap_change_24h: 219883884,
//     market_cap_change_percentage_24h: 0.86192,
//     circulating_supply: 51987017573.0,
//     total_supply: 99988884267.0,
//     max_supply: 100000000000.0,
//     ath: 3.4,
//     ath_change_percentage: -85.43408,
//     ath_date: "2018-01-07T00:00:00.000Z",
//     atl: 0.00268621,
//     atl_change_percentage: 18328.05019,
//     atl_date: "2014-05-22T00:00:00.000Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:33.477Z",
//     price_change_percentage_24h_in_currency: 0.8478802143584051,
//   },
//   {
//     id: "staked-ether",
//     symbol: "steth",
//     name: "Lido Staked Ether",
//     image:
//       "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1608607546",
//     current_price: 1733.48,
//     market_cap: 12645982154,
//     market_cap_rank: 7,
//     fully_diluted_valuation: 12645982154,
//     total_volume: 13973475,
//     high_24h: 1742.06,
//     low_24h: 1710.33,
//     price_change_24h: 16.88,
//     price_change_percentage_24h: 0.98349,
//     market_cap_change_24h: 170554350,
//     market_cap_change_percentage_24h: 1.36712,
//     circulating_supply: 7297273.17283336,
//     total_supply: 7297273.17283336,
//     max_supply: 7297273.17283336,
//     ath: 4829.57,
//     ath_change_percentage: -64.11584,
//     ath_date: "2021-11-10T14:40:47.256Z",
//     atl: 482.9,
//     atl_change_percentage: 258.88681,
//     atl_date: "2020-12-22T04:08:21.854Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:11.291Z",
//     price_change_percentage_24h_in_currency: 0.9834876044568921,
//   },
//   {
//     id: "cardano",
//     symbol: "ada",
//     name: "Cardano",
//     image:
//       "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
//     current_price: 0.26288,
//     market_cap: 9202685721,
//     market_cap_rank: 8,
//     fully_diluted_valuation: 11816824406,
//     total_volume: 131767639,
//     high_24h: 0.263519,
//     low_24h: 0.258688,
//     price_change_24h: 0.0018895,
//     price_change_percentage_24h: 0.72397,
//     market_cap_change_24h: 27213668,
//     market_cap_change_percentage_24h: 0.29659,
//     circulating_supply: 35045020830.3234,
//     total_supply: 45000000000.0,
//     max_supply: 45000000000.0,
//     ath: 3.09,
//     ath_change_percentage: -91.49362,
//     ath_date: "2021-09-02T06:00:10.474Z",
//     atl: 0.01925275,
//     atl_change_percentage: 1263.87968,
//     atl_date: "2020-03-13T02:22:55.044Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:37.846Z",
//     price_change_percentage_24h_in_currency: 0.7239715422810078,
//   },
//   {
//     id: "dogecoin",
//     symbol: "doge",
//     name: "Dogecoin",
//     image:
//       "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
//     current_price: 0.062364,
//     market_cap: 8716709595,
//     market_cap_rank: 9,
//     fully_diluted_valuation: 8716697751,
//     total_volume: 181647904,
//     high_24h: 0.062712,
//     low_24h: 0.061811,
//     price_change_24h: 0.00023143,
//     price_change_percentage_24h: 0.37249,
//     market_cap_change_24h: 21132990,
//     market_cap_change_percentage_24h: 0.24303,
//     circulating_supply: 139837536383.705,
//     total_supply: 139837346383.705,
//     max_supply: null,
//     ath: 0.731578,
//     ath_change_percentage: -91.47491,
//     ath_date: "2021-05-08T05:08:23.458Z",
//     atl: 8.69e-5,
//     atl_change_percentage: 71666.36867,
//     atl_date: "2015-05-06T00:00:00.000Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:37.296Z",
//     price_change_percentage_24h_in_currency: 0.3724881229840595,
//   },
//   {
//     id: "solana",
//     symbol: "sol",
//     name: "Solana",
//     image:
//       "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
//     current_price: 15.95,
//     market_cap: 6360336123,
//     market_cap_rank: 10,
//     fully_diluted_valuation: 8763954149,
//     total_volume: 146916833,
//     high_24h: 15.99,
//     low_24h: 15.4,
//     price_change_24h: 0.542892,
//     price_change_percentage_24h: 3.52439,
//     market_cap_change_24h: 203573256,
//     market_cap_change_percentage_24h: 3.3065,
//     circulating_supply: 399497185.471957,
//     total_supply: 550470124.311074,
//     max_supply: null,
//     ath: 259.96,
//     ath_change_percentage: -93.87491,
//     ath_date: "2021-11-06T21:54:35.825Z",
//     atl: 0.500801,
//     atl_change_percentage: 3079.45047,
//     atl_date: "2020-05-11T19:35:23.449Z",
//     roi: null,
//     last_updated: "2023-06-19T23:27:38.076Z",
//     price_change_percentage_24h_in_currency: 3.524394992546308,
//   },
// ];
const Coins = ["bitcoin", "ethereum", "shibacash", "cardano"];

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  gap: 10px;
`;

const SearchInput = styled.input`
  border-bottom: 1px solid black;
  font-size: 20px;
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search coins..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

const SearchResultWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background: white;
  width: 100%;
  height: 73vh;
  overflow-y: scroll;
`;

const SearchResults = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0 ? (
        <SearchResultWrapper>
          {searchResults.map((coin) => (
            <CoinBlock key={coin.id} searchResult={coin} />
          ))}
        </SearchResultWrapper>
      ) : (
        <p>'...'</p>
      )}
    </div>
  );
};

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const searchCoins = async (searchTerm) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&name=${searchTerm}`
      );
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too Many Requests");
        } else {
          throw new Error("An error occurred");
        }
      }

      setSearchResults(data);
    } catch (error: any) {
      console.error(error);

      if (error.message === "Too Many Requests") {
        setError("Too Many Requests");
      } else {
        setError("An error occurred");
      }
    }

    setIsLoading(false);
  };

  const debouncedSearchCoins = debounce(searchCoins, 1000);

  return (
    <div>
      <SearchBar onSearch={debouncedSearchCoins} />

      {isLoading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {!isLoading && !error && <SearchResults searchResults={searchResults} />}
    </div>
  );
};

export const CoinList = () => {
  return (
    <Wrapper>
      <SearchPage />
      {Coins.map((item) => {
        return <CoinBlock key={item} coinId={item} />;
      })}
    </Wrapper>
  );
};

// [
