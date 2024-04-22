export interface ProductViewModel{
    article : string;
    selsellerArticle : string;
    discount : number;
    lastDiscount : number;
    isCheck : boolean;
    sizes : SizeViewModel[]
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