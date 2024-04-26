import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductViewModel, SizeViewModel } from '../models/product-view.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PriceMathUtility } from '../../../../../shared/utilities/common/PriceMath.Utility';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class SizeComponent {
  @Input({required: true}) product! : ProductViewModel;
  @Input({required: true}) size! : SizeViewModel;

  @Output() changedPrice : EventEmitter<number> = new EventEmitter();

  returnPrice(){
    this.size.price = this.size.lastPrice;
  }

  getDiscountPrice(){
    const value = PriceMathUtility.discountPrice(this.product.discount, this.size.price);

    return value.toFixed(2);
  }

  getBuyerDiscountPrice(){
    const value = PriceMathUtility.discountPrice(this.product.discount, this.size.price);
    const buyerValue = PriceMathUtility.discountPrice(this.size.spp, value);

    return Math.trunc(buyerValue);
  }
}
