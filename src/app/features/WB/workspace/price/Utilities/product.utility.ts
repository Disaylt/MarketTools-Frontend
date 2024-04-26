import { ProductViewModel } from "../models/product-view.model";

export class ProductUtility{
    
    constructor(private product : ProductViewModel){}

    setPrice(value : number){
        this.product.price = value;
        this.updatePrice();
    }

    setLastPrice(value : number){
        this.product.lastPrice = value;
        this.updatePrice();
    }

    updatePrice(){
        this.product.sizes
            .forEach(x=> x.price = this.product.price);
    }

    updateDiscount(){
        const canEdit = this.product.discount == this.product.lastDiscount 
            && this.product.editableSizePrice;

        this.product.sizes
        .forEach(x=> {
            x.canEdit = canEdit;
        })
    }

    setDiscount(value : number){
        this.product.discount = value;
        
        this.updateDiscount();
    }

    setLastDiscount(value : number){
        this.product.lastDiscount = value;
        
        this.updateDiscount();
    }

}