export interface Filter{
    article : string;
    sellerArticle : string;
    name : string;
    brand : string;

    minStock : number;
    maxStock : number;
    minPrice: number;
    maxPrice: number;
    minDiscount : number;
    maxDiscount : number;

    isSelected : boolean;
    isChangePrice : boolean;
    isChangeDiscount : boolean;
    canEditSize : boolean;
}