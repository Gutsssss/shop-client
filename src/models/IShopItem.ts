export interface IShopItem {
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
}