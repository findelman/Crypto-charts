import { debounce } from "@/utils/debonce";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResult";

export const  SearchBox = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={debouncedSearchCoins} />
  
        {isLoading && <div>Loading...</div>}
  
        {error && <div>{error}</div>}
  
        {!isLoading && !error && searchTerm.length !== 0 && <SearchResults searchResults={searchResults} />}
      </div>
    );
  };