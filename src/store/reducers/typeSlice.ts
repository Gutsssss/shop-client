
import type { IType } from '../../models/IType';
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
  types: IType[];
  isLoading: boolean;
  error: string | unknown;
  type:IType,
  selectedTypes:object[]
}

const initialState: TypeState = {
  types: [],
  isLoading: false,
  error: "",
  type:{
    id:null,
    name:''
  },
  selectedTypes:[]
};

export const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    typeFetching(state) {
      state.isLoading = true;
    },
    typeFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.error = '';
      state.types = actions.payload
    },
    createType(state,action) {
      state.isLoading = false
      state.type = action.payload
    },
    getSelectedTypes(state,action) {
      state.selectedTypes = action.payload
    },
    typeFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const {typeFetching,typeFetchingSuccess,typeFetchingError,createType,getSelectedTypes} = typeSlice.actions;
export const typeReducer = typeSlice.reducer;
