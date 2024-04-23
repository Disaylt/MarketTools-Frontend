import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../models/product-view.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SizeComponent } from "../size/size.component";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [FormsModule, CommonModule, SizeComponent]
})
export class ProductComponent {
  @Input({required: true}) product! : ProductViewModel;

  returnPrice(){
    this.product.price = this.product.lastPrice;
    this.updateSizesPrice();
  }

  returnDiscount(){
    this.product.discount = this.product.lastDiscount;
    this.updateSizesChangeStatus();
  }

  changeDiscount(){
    this.updateSizesChangeStatus();
  }

  changeDiscountEditableStatus(){
    const canChanged = this.product
      .sizes
      .every(x=> x.price == x.lastPrice);
    this.product.canEdit = canChanged;
  }

  changePrice(){
    this.updateSizesPrice();
  }

  getDiscountPrice(){
    const value = this.mathDiscountPrice();

    return value.toFixed(2);
  }

  getBuyerDiscountPrice(){
    const value = this.mathDiscountPrice();
    const buyerValue = (1 - (this.product.spp/100)) * value;

    return Math.trunc(buyerValue);
  }

  private mathDiscountPrice(){
    return (1 - (this.product.discount/100)) * this.product.price;
  }

  private updateSizesChangeStatus(){
    const canEdit = this.product.discount == this.product.lastDiscount 
      && this.product.editableSizePrice;

    this.product.sizes
      .forEach(x=> {
        x.canEdit = canEdit;
      })
  }

  private updateSizesPrice(){
    this.product.sizes
      .forEach(x=> {
        x.price = this.product.price
      })
  }
}
