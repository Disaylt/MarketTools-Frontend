import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../models/product-view.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({required: true}) product! : ProductViewModel;

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
}
