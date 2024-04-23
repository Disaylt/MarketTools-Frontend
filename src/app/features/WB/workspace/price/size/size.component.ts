import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductViewModel, SizeViewModel } from '../models/product-view.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    const value = this.mathDiscountPrice();

    return value.toFixed(2);
  }

  getBuyerDiscountPrice(){
    const value = this.mathDiscountPrice();
    const buyerValue = (1 - (this.size.spp/100)) * value;

    return Math.trunc(buyerValue);
  }

  private mathDiscountPrice(){
    return (1 - (this.product.discount/100)) * this.size.price;
  }
}
