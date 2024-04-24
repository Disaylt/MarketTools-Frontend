import { ProductViewModel } from "../models/product-view.model";

export class ProductUtility{
    
    constructor(private product : ProductViewModel){}

    changePriceWithSizes(value : number){
        this.product.price = value;
        this.changePriceForSizes(value);
    }

    changePriceForSizes(value : number){
        this.product.sizes
            .forEach(x=> x.price = value);
    }

}