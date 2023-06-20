import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "bitcoin",
    currency: "usd",
    days: "7",
    interval: "daily",
  },
  reducers: {
    setActiveToken: (state, action) => {
      state.token = action.payload;
    },
    setcurrency: (state, action) => {
      state.currency = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setInterval: (state, action) => {
      state.interval = action.payload;
    },
  },
});

export const { setActiveToken, setcurrency, setDays, setInterval } =
  userSlice.actions;

export const getActiveToken = (state: any) => state.user.token;

export const useUser = () => {
  const {
    token: activeToken,
    currency,
    days,
    interval,
  } = useSelector((state: any) => state.user);

  return {
    activeToken,
    days,
    interval,
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

  const _setDays = (day: string) => {
    dispatch(setDays(day));
  };
  const _setInterval = (interval: string) => {
    dispatch(setInterval(interval));
  };

  return { _setActiveToken, _setcurrency, _setDays, _setInterval };
};

export default userSlice.reducer;
