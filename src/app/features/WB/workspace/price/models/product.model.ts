export interface ProductApiModel{
    id : number;
    brand : string;
    sizes : SizeApiModel[];
}

export interface SizeApiModel{
    optionId : number;
    price : PriceApiModel | null;
    stocks : StockApiModel[];
}

export interface PriceApiModel{
    totalReal : number;
}

export interface StockApiModel{
    qty : number;
    wh : number;
}