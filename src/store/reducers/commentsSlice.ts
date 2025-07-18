import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IComment } from "../../models/IComment";

interface ItemsState {
  comments: IComment[];
  isLoading: boolean;
  error: string | unknown;
}

const initialState: ItemsState = {
  comments: [],
  isLoading: false,
  error: "",
};

export const commentSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    commentsFetching(state) {
      state.isLoading = true;
    },
    commentsFetchingSuccess(state, actions) {
      state.isLoading = false;
      state.comments = actions.payload
    },
    commentsFetchingError(state, actions:PayloadAction<string | unknown>) {
      state.isLoading = false;
      state.error = actions.payload
    },
  },
});

export const {commentsFetching,commentsFetchingSuccess,commentsFetchingError} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
