import { fetcher } from "@/api/fetcher";
import { useGetCurrencies } from "@/hooks/useGetCurrencies";
import { useSetUser, useUser } from "@/store/user";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  margin-left: 5px;
  width: 100%;
  button {
    display: flex;
    padding: 3px 15px;
    text-transform: uppercase;
  }
`;

const DropDown = styled.div`
  padding: 10px;
  border-radius: 10px;
  z-index: 10000;
  border: 1px solid black;
  width: 73vw;
  gap: 5px;
  background: white;
  position: absolute;
  display: grid;
  grid: auto / repeat(auto-fit, minmax(130px, 1fr));
`;

const ChangeButton = ({
  text,
  showDropDown,
}: {
  text: string;
  showDropDown: any;
}) => {
  const { _setcurrency } = useSetUser();
  return (
    <button
      onClick={() => {
        _setcurrency(text);
        showDropDown((e: any) => !e);
      }}
    >
      {text}
    </button>
  );
};

export const ChangeCurrency = () => {
  const { currency } = useUser();
  const [showDropDown, setShowDropDown] = useState(false);
  const currencyData = useGetCurrencies();
  return (
    <Wrapper>
      <button
        onClick={() => {
          setShowDropDown((e) => !e);
        }}
      >
        {currency}&nbsp;
        <p style={{ transform: `rotate(${showDropDown ? "90" : "0"}deg)` }}>
          ▼
        </p>
      </button>
      {showDropDown && (
        <DropDown>
          {currencyData?.map((item: any) => (
            <ChangeButton
              key={item}
              showDropDown={setShowDropDown}
              text={item}
            />
          ))}
        </DropDown>
      )}
    </Wrapper>
  );
};
