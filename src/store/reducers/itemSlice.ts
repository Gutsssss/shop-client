import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IShopItem } from "../../models/IShopItem";

interface ItemsState {
  items: IShopItem[];
  isLoading: boolean;
  error: string | unknown;
  item:IShopItem | null
}

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: "",
  item:null
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    itemsFetching(state) {
      state.isLoading = true;
    },
    itemsFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.items = actions.payload
    },
    getOneItem(state,actions) {
      state.isLoading = false
      state.item = actions.payload
    },
    itemsFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const {itemsFetching,itemsFetchingError,itemsFetchingSuccess,getOneItem} = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
