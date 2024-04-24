import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductViewModel } from '../models/product-view.model';
import { ProductUtility } from '../Utilities/product.utility';

@Component({
  selector: 'app-range-price-changer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './range-price-changer.component.html',
  styleUrl: './range-price-changer.component.scss'
})
export class RangePriceChangerComponent {
  @Input({required : true}) products! : ProductViewModel[];

  productPrice : number = 0;
  sizePrice : number = 0;
  discount : number = 0

  subjects : string[] = ["Цены (Арт.)", "Цены (Размер)", "Скидки"]
  selectedSubject : string | null = null;

  selectSubject(subject : string){
    this.selectedSubject = subject;
  }

  resetArticlePrice(){
    this.products
    .filter(x=> x.isCheck)
    .forEach(x=> {
      const productUtility = new ProductUtility(x);
      productUtility.changePriceWithSizes(x.lastPrice);
    })
  }

  setArticlePrice(){
    this.products
    .filter(x=> x.isCheck)
    .forEach(x=> {
      const productUtility = new ProductUtility(x);
      productUtility.changePriceWithSizes(this.productPrice);
    })
  }

  resetSizePrice(){
    this.products
    .filter(x=> x.isCheck)
    .forEach(product=> {
        product.sizes.forEach(size=> {
          size.price = size.lastPrice;
        })
    })
  }

  setSizePrice(){
    this.products
    .filter(x=> x.isCheck)
    .forEach(product=> {
        product.sizes.forEach(size=> {
          size.price = this.sizePrice;
        })
    })
  }

  resetDiscount(){
    this.products
    .filter(x=> x.isCheck)
    .forEach(x=> {
      x.discount = x.lastDiscount;
    })
  }

  setDiscount(){
    this.products
    .filter(x=> x.isCheck)
    .forEach(x=> {
      x.discount = this.discount;
    })
  }

  canChangeArticlePrices(){
    return this.products
      .filter(x=> x.isCheck)
      .every(x=> {
        return x.editableSizePrice == false 
      })
  }

  canChangeSizesPrices(){
    return this.products
      .filter(x=> x.isCheck)
      .every(x=> {
        return x.editableSizePrice && x.discount == x.lastDiscount
      })
  }

  canChangeDiscounts(){
    return this.products
      .filter(x=> x.isCheck && x.price == x.lastPrice)
      .every(product=> {
        return product.sizes
          .some(size => size.price != size.lastPrice) == false
      })
  }
}
