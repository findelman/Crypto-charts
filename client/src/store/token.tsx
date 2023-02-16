import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const activeTokenSlice = createSlice({
  name: "activeToken",
  initialState: { token: "bitcoin" },
  reducers: {
    setActiveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setActiveToken } = activeTokenSlice.actions;

export const getActiveToken = (state: any) => state.activeToken?.token;

export default activeTokenSlice.reducer;

export const usesetActiveToken = () => {
  const dispatch = useDispatch();

  const _setActiveToken = (coinId: string) => {
    dispatch(setActiveToken(coinId));
  };

  return _setActiveToken;
};
