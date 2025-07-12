
import type { IShopItem } from "./IShopItem";

export interface IBasketItem {
    id:number,
    items:IShopItem[],
    shop_item:IShopItem,
    totalItems:number
}