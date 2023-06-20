import styled from "styled-components";
import { Container } from "@/styles/Constructors";
import React, { useEffect, useState } from "react";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns:  auto 1fr 1fr 1fr 1fr 1fr;
  padding: 20px 0px;
`;

const GridHeader = styled.div<{ active?: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: #f5f5f5;
  font-weight: bold;
  background-color: ${({ active }) => (active ? "#f0f0f0" : "#e0e0e0")};
`;

const GridItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
`;

const GridItemPrecent = styled(GridItem)<{ reit?: boolean }>`
  color: ${({ reit }) => (reit ? "green" : "red")};
`;

export const CryptoTable = ({ cryptoList }: any) => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (header: string) => {
    if (header === sortBy) {
      // При повторном нажатии меняем порядок сортировки
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(header);
      setSortOrder("asc");
    }
  };

  const sortFunctions = {
    ID: (a: any, b: any) => a.id - b.id,
    Name: (a: any, b: any) => a.name.localeCompare(b.name),
    Price: (a: any, b: any) => b.current_price - a.current_price,
    "Market Cap": (a: any, b: any) => b.market_cap - a.market_cap,
    Volume: (a: any, b: any) => b.total_volume - a.total_volume,
    "Price Change (24h)": (a: any, b: any) =>
      b.price_change_percentage_24h - a.price_change_percentage_24h,
  };

  const sortFunction = sortFunctions[sortBy] || (() => 0);

  const sortedCryptoList = Array.isArray(cryptoList)
    ? [...cryptoList].sort((a, b) => {
        const result = sortFunction(a, b);
        return sortOrder === "asc" ? result : -result;
      })
    : [];

  const getArrowIcon = (header: string) => {
    if (header === sortBy) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <Container>
      <GridContainer>
        <GridHeader
          onClick={() => handleSortChange("ID")}
          active={sortBy === "ID"}
        >
          ID {getArrowIcon("ID")}
        </GridHeader>
        <GridHeader
          onClick={() => handleSortChange("Name")}
          active={sortBy === "Name"}
        >
          Name {getArrowIcon("Name")}
        </GridHeader>
        <GridHeader
          onClick={() => handleSortChange("Price")}
          active={sortBy === "Price"}
        >
          Price {getArrowIcon("Price")}
        </GridHeader>
        <GridHeader
          onClick={() => handleSortChange("Market Cap")}
          active={sortBy === "Market Cap"}
        >
          Market Cap {getArrowIcon("Market Cap")}
        </GridHeader>
        <GridHeader
          onClick={() => handleSortChange("Volume")}
          active={sortBy === "Volume"}
        >
          Volume {getArrowIcon("Volume")}
        </GridHeader>
        <GridHeader
          onClick={() => handleSortChange("Price Change (24h)")}
          active={sortBy === "Price Change (24h)"}
        >
          Price Change (24h) {getArrowIcon("Price Change (24h)")}
        </GridHeader>

        {sortedCryptoList.map((crypto: any, index) => (
          <React.Fragment key={crypto.id}>
            <GridItem>{++index}</GridItem>
            <GridItem>{crypto.name}</GridItem>
            <GridItem>${crypto.current_price}</GridItem>
            <GridItem>${crypto.market_cap}</GridItem>
            <GridItem>{crypto.total_volume}</GridItem>
            <GridItemPrecent reit={crypto.price_change_percentage_24h >= 0}>
              {crypto.price_change_percentage_24h}%
            </GridItemPrecent>
          </React.Fragment>
        ))}
      </GridContainer>
    </Container>
  );
};
