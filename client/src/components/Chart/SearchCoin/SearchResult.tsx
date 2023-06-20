import styled from "styled-components";
import { CoinBlock } from "../Coin/CoinBlock";

const SearchResultWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background: white;
  width: 100%;
  height: 73vh;
  overflow-y: scroll;
`;

export const SearchResults = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0 ? (
        <SearchResultWrapper>
          {searchResults.map((coin) => (
            <CoinBlock key={coin.id} searchResult={coin} />
          ))}
        </SearchResultWrapper>
      ) : null}
    </div>
  );
};