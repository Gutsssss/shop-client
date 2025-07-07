import type { AppDispatch } from "../store";
import { itemsFetching, itemsFetchingError, itemsFetchingSuccess } from "./itemSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {$host} from '../../http/index.js'
import { typeFetching, typeFetchingError, typeFetchingSuccess } from "./typeSlice.js";
import { brandFetching, brandFetchingError, brandFetchingSuccess } from "./brandSlice.js";
export const fetchItems = () => async(dispatch:AppDispatch) => {
    dispatch(itemsFetching())
    try {
        const response = await $host.get('api/shopitem')
        dispatch(itemsFetchingSuccess(response.data.rows))
    } catch (error) {
        dispatch(itemsFetchingError(error))
    }
}
export const fetchTypes = () => async(dispatch:AppDispatch) => {
    dispatch(typeFetching())
    try {
        const response = await $host.get('api/type')
        dispatch(typeFetchingSuccess(response.data))
    } catch (error) {
        dispatch(typeFetchingError(error))
    }
}
export const fetchBrands = () => async(dispatch:AppDispatch) => {
    dispatch(brandFetching())
    try {
        const response = await $host.get('api/brand')
        dispatch(brandFetchingSuccess(response.data))
    } catch (error) {
        dispatch(brandFetchingError(error))
    }
}
export const searchProducts = (searchValue: string) => async (dispatch: AppDispatch) => {
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