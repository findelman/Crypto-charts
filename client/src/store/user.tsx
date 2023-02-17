import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const userSlice = createSlice({
  name: "user",
  initialState: { token: "bitcoin", currency: "usd" },
  reducers: {
    setActiveToken: (state, action) => {
      state.token = action.payload;
    },
    setcurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setActiveToken, setcurrency } = userSlice.actions;

export const getActiveToken = (state: any) => state.user.token;

export const useUser = () => {
  const { token: activeToken, currency } = useSelector(
    (state: any) => state.user
  );

  return {
    activeToken,
    currency,
  };
};

export const useSetUser = () => {
  const dispatch = useDispatch();

  const _setActiveToken = (coinId: string) => {
    dispatch(setActiveToken(coinId));
  };
  const _setcurrency = (currency: string) => {
    dispatch(setcurrency(currency));
  };

  return { _setActiveToken, _setcurrency };
};

export default userSlice.reducer;
