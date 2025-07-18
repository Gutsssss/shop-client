import type { IBrand } from "./IBrand";
import type { IType } from "./IType";

export interface IShopItem {
    shop_item?:{
        id?:number,
    name:string,
    price:number | string,
    rating?:number,
    img:File | string,
    info?:string,
    createdAt?:Date | string,
    updatedAr?:Date | string,
    typeId:number | string,
    brandId:number | string,
    brand?:IBrand,
    type?:IType
    }
    id?:number,
    name:string,
    price:number | string,
    rating?:number,
    img:File | string,
    info?:[{
        id:number,
        fullDescription:string
    }],
    createdAt?:Date | string,
    updatedAr?:Date | string,
    typeId:number | string,
    brandId:number | string,
    brand?:IBrand,
    type?:IType
}