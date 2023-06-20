import { useState } from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  border-bottom: 1px solid black;
  font-size: 20px;
`;

export const SearchBar = ({ onSearch,searchTerm,setSearchTerm }) => {


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <SearchInput
      type="text"
      placeholder="Search coins..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};