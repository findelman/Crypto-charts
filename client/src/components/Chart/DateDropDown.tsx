import { useSetUser } from "@/store/user";
import { useState } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  padding: 8px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 10px;
`;

const DropdownOptions = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const OptionButton = styled.button<{ isActive?: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px;
  background-color: ${(props) => (props.isActive ? "#e0e0e0" : "transparent")};
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const DateDropdown = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("7");
  const { _setDays } = useSetUser();
  const handleDropdownChange = (date) => {
    setDropdownValue(date);
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const renderDropdownOptions = () => {
    const options = ["7", "14", "30"];

    return options.map((date) => (
      <OptionButton
        key={date}
        onClick={() => {
          _setDays(date);
          setIsOpen(false);
          handleDropdownChange(date);
        }}
        isActive={dropdownValue === date}
      >
        {date}
      </OptionButton>
    ));
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleDropdown}>
        {dropdownValue}{" "}
        <p style={{ transform: `rotate(${isOpen ? "90" : "0"}deg)` }}>▼</p>
      </DropdownButton>
      <DropdownOptions isOpen={isOpen}>
        {renderDropdownOptions()}
      </DropdownOptions>
    </DropdownWrapper>
  );
};
