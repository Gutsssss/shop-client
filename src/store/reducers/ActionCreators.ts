import type { AppDispatch } from "../store";
import {
  getOneItem,
  itemsFetching,
  itemsFetchingError,
  itemsFetchingSuccess,
} from "./itemSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { $host, $authHost } from "../../http/index.js";
import {
  typeFetching,
  typeFetchingError,
  typeFetchingSuccess,
} from "./typeSlice.js";
import {
  brandFetching,
  brandFetchingError,
  brandFetchingSuccess,
} from "./brandSlice.js";
import {
  logout,
  userFetching,
  userFetchingError,
  userFetchingSuccess,
} from "./userSlice.js";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
//запросы по продуктам
export const fetchItems = () => async (dispatch: AppDispatch) => {
  dispatch(itemsFetching());
  try {
    const response = await $host.get("api/shopitem");
    dispatch(itemsFetchingSuccess(response.data.rows));
  } catch (error) {
    dispatch(itemsFetchingError(error));
  }
};
export const searchProducts =
  (searchValue: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(itemsFetching());
      const response = await $host.get(`api/shopitem/search/${searchValue}`);
      dispatch(itemsFetchingSuccess(response.data));
      return response.data;
    } catch (err) {
      const error = err as Error;
      dispatch(itemsFetchingError(error.message));
      throw error;
    }
  };
  export const getOneProductFromApi = (id:number) => async (dispatch:AppDispatch) => {
        
    try {
        dispatch(fetchItems())
        const response = await $host.get(`api/shopitem/${id}`)
        dispatch(getOneItem(response.data))
        return response.data
    }
    catch(err) {
        console.log(err)
    }
}
//бренды и типы
export const fetchTypes = () => async (dispatch: AppDispatch) => {
  dispatch(typeFetching());
  try {
    const response = await $host.get("api/type");
    dispatch(typeFetchingSuccess(response.data));
  } catch (error) {
    dispatch(typeFetchingError(error));
  }
};
export const fetchBrands = () => async (dispatch: AppDispatch) => {
  dispatch(brandFetching());
  try {
    const response = await $host.get("api/brand");
    dispatch(brandFetchingSuccess(response.data));
  } catch (error) {
    dispatch(brandFetchingError(error));
  }
};
//запросы для юзера
export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userFetching());
      const { data } = await $host.post("api/user/login", { email, password });

      const decodedUser = jwtDecode(data.token);
      localStorage.setItem("token", data.token);
      dispatch(userFetchingSuccess(decodedUser));
      return decodedUser;
    } catch (err: unknown) {
      let errorMessage = "Login failed";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response?.data?.message;
      }
      dispatch(userFetchingError(errorMessage));
      throw errorMessage;
    }
  };
export const registration =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(userFetching());
    try {
      const { data } = await $host.post("api/user/registration", {
        email,
        password,
      });
      const decodedUser = jwtDecode(data.token);
      localStorage.setItem("token", data.token);
      dispatch(userFetchingSuccess(decodedUser));
      return decodedUser;
    } catch (err: unknown) {
      let errorMessage = "Checks failed";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response?.data?.message;
      }
      dispatch(userFetchingError(errorMessage));
      throw errorMessage;
    }
  };
export const check = () => async (dispatch: AppDispatch) => {
  dispatch(userFetching());
  try {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    const decodedUser = jwtDecode(data.token);
    dispatch(userFetchingSuccess(decodedUser));
    return decodedUser;
  } catch (err: unknown) {
    let errorMessage = "Checks failed";
    if (err instanceof AxiosError && err.response?.data?.message) {
      errorMessage = err.response?.data?.message;
    }
    dispatch(userFetchingError(errorMessage));
    throw errorMessage;
  }
};
export const logoutAndRemoveToken = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(logout());
    localStorage.removeItem("token");
  } catch (err: unknown) {
    let errorMessage = "Checks failed";
    if (err instanceof AxiosError && err.response?.data?.message) {
      errorMessage = err.response?.data?.message;
    }
    dispatch(userFetchingError(errorMessage));
    throw errorMessage;
  }
};
