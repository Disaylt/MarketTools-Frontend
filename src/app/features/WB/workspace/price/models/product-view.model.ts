export interface ProductViewModel{
    article : string;
    selsellerArticle : string;
    discount : number;
    lastDiscount : number;
    price : number;
    lastPrice : number;
    isCheck : boolean;
    sizes : SizeViewModel[]
    imageUrl : string;
    stock : number;
    name : string;
    canEdit : boolean;
    brand : string;
    spp : number;
}

export interface SizeViewModel{
    name : string;
    price : number;
    lastPrice : number;
    spp : number;
    sizeId : number;
    canEdit : boolean;
    stock : number;
}