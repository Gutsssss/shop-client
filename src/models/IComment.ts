export interface IComment {
    id:number,
    createdAt:string,
    text:string,
    userId:number,
    shopItemId:number,
    rating:number,
    user:{
        email:string,
        id:number
    }
}