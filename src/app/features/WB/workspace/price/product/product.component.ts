import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../models/product-view.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SizeComponent } from "../size/size.component";
import { ProductUtility } from '../Utilities/product.utility';
import { PriceMathUtility } from '../../../../../shared/utilities/common/PriceMath.Utility';

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
    const productUtility = new ProductUtility(this.product);
    productUtility.changePriceWithSizes(this.product.lastPrice);
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
    const productUtility = new ProductUtility(this.product);
    productUtility.changePriceForSizes(this.product.price);
  }

  getDiscountPrice(){
    const value = PriceMathUtility.discountPrice(this.product.discount, this.product.price);

    return value.toFixed(2);
  }

  getBuyerDiscountPrice(){
    const value = PriceMathUtility.discountPrice(this.product.discount, this.product.price);
    const buyerValue = PriceMathUtility.discountPrice(this.product.spp, value);

    return Math.trunc(buyerValue);
  }

  private updateSizesChangeStatus(){
    const canEdit = this.product.discount == this.product.lastDiscount 
      && this.product.editableSizePrice;

    this.product.sizes
      .forEach(x=> {
        x.canEdit = canEdit;
      })
  }
}
