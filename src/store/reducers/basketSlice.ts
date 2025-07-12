import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBasket } from "../../models/IBasket";

interface ItemsState {
  basket: IBasket;
  isLoading: boolean;
  error: string | unknown;
}

const initialState: ItemsState = {
  basket:{
    id: null,
    name: "",
    items: [],
    totalItems:0
  },
  isLoading: false,
  error: "",
};

export const basketSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    basketFetching(state) {
      state.isLoading = true;
    },
    basketFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.basket = actions.payload
    },
    basketFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const {basketFetching,basketFetchingSuccess,basketFetchingError} = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
