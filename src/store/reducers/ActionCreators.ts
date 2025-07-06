import type { AppDispatch } from "../store";
import { itemsFetching, itemsFetchingError, itemsFetchingSuccess } from "./itemSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {$host} from '../../http/index.js'
export const fetchItems = () => async(dispatch:AppDispatch) => {
    dispatch(itemsFetching())
    try {
        const response = await $host.get('api/shopitem')
        dispatch(itemsFetchingSuccess(response.data.rows))
    } catch (error) {
        dispatch(itemsFetchingError(error))
    }
}