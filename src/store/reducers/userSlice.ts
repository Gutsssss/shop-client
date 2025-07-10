import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../models/IUser";
import type { JwtPayload } from "jwt-decode";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  isAuth:boolean;
  error: string | unknown;
}

const initialState: UserState = {
  user:{
    email:'',
    id:undefined,
    role:''
  },
  isLoading: false,
  isAuth:false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userFetching(state) {
      state.isLoading = true;
      state.error = null;
    },
    userFetchingSuccess(state, action: PayloadAction<IUser | JwtPayload>) {
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      state.user = action.payload as IUser
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
    }
  },
});

export const {userFetching,userFetchingSuccess,userFetchingError,logout} = userSlice.actions;
export const userReducer = userSlice.reducer
