import { PriceApiModel } from "./price.model";
import { ProductApiModel } from "./product.model";

export interface PriceDetailsResult{
    prices : PriceApiModel[]
    products : ProductApiModel[]
}