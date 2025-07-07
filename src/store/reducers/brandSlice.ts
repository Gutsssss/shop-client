import type { IBrand } from '../../models/IBrand';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
  brands: IBrand[];
  isLoading: boolean;
  error: string | unknown;
  brand:IBrand
}

const initialState: TypeState = {
  brands: [],
  isLoading: false,
  error: "",
  brand:{
    id:null,
    name:'',
  }
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    brandFetching(state) {
      state.isLoading = true;
    },
    brandFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.error = '';
      state.brands = actions.payload
    },
    createBrand(state,action) {
      state.isLoading = false
      state.brand = action.payload
    },
    brandFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const {brandFetching,brandFetchingSuccess,brandFetchingError,createBrand} = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
