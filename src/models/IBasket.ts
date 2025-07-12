import type { IShopItem } from "./IShopItem";

export interface IBasket {
    id:number | null,
    name:string,
    items:Array<IShopItem>,
    totalItems:number
}