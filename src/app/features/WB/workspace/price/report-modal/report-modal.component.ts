import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { ProductViewModel, SizeViewModel } from '../models/product-view.model';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { PriceMathUtility } from '../../../../../shared/utilities/common/PriceMath.Utility';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';

@Component({
    selector: 'app-report-modal',
    standalone: true,
    templateUrl: './report-modal.component.html',
    styleUrl: './report-modal.component.scss',
    imports: [ModalComponent, CommonModule, ProgressBarComponent, SpinerComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem],
})
export class ReportModalComponent{
  constructor(public dialogRef: DialogRef<any>){}

  subjects : string[] = ["По артикулу", "По размеру"]
  selectedSubject : string | null = null;

  isSuccess : boolean = false;
  isLoad : boolean = false;
  products : ProductViewModel[] = [];
  connectionId! : number;

  viewProducts : ProductViewModel[] = [];

  changeType(type : string){
    this.selectedSubject = type;

    if(type == "По артикулу"){
      this.viewProducts = this.getArticleProducts();
    }
    else if(type == "По размеру")
    {
      this.viewProducts = this.getSizesProducts();
    }
    else{
      this.viewProducts = [];
    }
  }

  private getArticleProducts(){
    return this.products
      .filter(product => {
        return product.price != product.lastPrice || product.discount != product.lastDiscount;
      })
  }

  private getSizesProducts(){
    return this.products
      .filter(product => {
        return product.editableSizePrice && product.sizes
          .some(size => size.price != size.lastPrice);
      })
  }

  getViewPrice(value : number, lastValue : number) : string{
    if(value == lastValue){
      return `${value} р.`;
    }

    if(value > lastValue){
      return `↑ ${lastValue} р. > ${value} р.`;
    }
    else{
      return `↓ ${lastValue} р. > ${value} р.`;
    }
  }

  getViewBuyerDiscountPrice(price : number, lastPrice : number, discount : number, lastDiscount : number, spp : number) : string{
    
    const disocuntPrice = PriceMathUtility.discountPrice(discount, price);
    const buyerDisocuntPrice = Math.trunc(PriceMathUtility.discountPrice(spp, disocuntPrice));
    const lastDiscountPrice = PriceMathUtility.discountPrice(lastDiscount, lastPrice);
    const lastBuyerDiscountPrice = Math.trunc(PriceMathUtility.discountPrice(spp, lastDiscountPrice));
    
    if(buyerDisocuntPrice == lastBuyerDiscountPrice){
      return `${buyerDisocuntPrice} р.`;
    }

    let result = buyerDisocuntPrice > lastBuyerDiscountPrice ? "↑" : "↓";

    return result + ` ${lastBuyerDiscountPrice} р. > ${buyerDisocuntPrice} р.`
  }

  getViewDiscountPrice(price : number, lastPrice : number, discount : number, lastDiscount : number) : string{
    
    const disocuntPrice = PriceMathUtility.discountPrice(discount, price);
    const lastDiscountPrice = PriceMathUtility.discountPrice(lastDiscount, lastPrice);
    
    if(disocuntPrice == lastDiscountPrice){
      return `${disocuntPrice} р.`;
    }

    let result = disocuntPrice > lastDiscountPrice ? "↑" : "↓";

    return result + ` ${lastDiscountPrice.toFixed(2)} р. > ${disocuntPrice.toFixed(2)} р.`;
  }

  getViewDiscount(value : number, lastValue : number) : string{
    if(value == lastValue){
      return `${value} %`;
    }

    if(value > lastValue){
      return `↑ ${lastValue} % > ${value} %`;
    }
    else{
      return `↓ ${lastValue} % > ${value} %`;
    }
  }
}
