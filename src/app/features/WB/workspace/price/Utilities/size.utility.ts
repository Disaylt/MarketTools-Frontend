import { ProductViewModel, SizeViewModel } from "../models/product-view.model";

export class SizeUtility{

    constructor(private product : ProductViewModel, private size : SizeViewModel) {}

    setPrice(value : number){
        this.size.price = value;
        this.update();
    }

    setLastPrice(value : number){
        this.size.lastPrice = value;
        this.update();
    }

    update(){
        const canChanged = this.product
            .sizes
            .every(x=> x.price == x.lastPrice);
            this.product.canEdit = canChanged;
    }
}