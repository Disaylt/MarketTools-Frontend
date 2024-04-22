export interface PriceApiModel{
    article : string;
    sellerArticle : string;
    discount : number;
    editableSizePrice : boolean;
    sizes : SizeApiModel[];
}

export interface SizeApiModel{
    name : string;
    price : number;
    discountedPrice : number;
    sizeId : number;
}