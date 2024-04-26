import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { ProductViewModel, SizeViewModel } from '../models/product-view.model';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { PriceMathUtility } from '../../../../../shared/utilities/common/PriceMath.Utility';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { PriceService } from '../Services/price.service';
import { ProductSendModel } from '../models/product-send.model';
import { finalize } from 'rxjs';
import { SizeSendModel } from '../models/size-send.model';
import { SizeUtility } from '../Utilities/size.utility';
import { ProductUtility } from '../Utilities/product.utility';

@Component({
    selector: 'app-report-modal',
    standalone: true,
    templateUrl: './report-modal.component.html',
    styleUrl: './report-modal.component.scss',
    imports: [ModalComponent, CommonModule, ProgressBarComponent, SpinerComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem],
})
export class ReportModalComponent{
  constructor(public dialogRef: DialogRef<any>, private priceService : PriceService){}

  subjects : string[] = ["По артикулу", "По размеру"]
  selectedSubject : string | null = null;

  isComplete : boolean = false;
  isLoad : boolean = false;
  products : ProductViewModel[] = [];
  connectionId! : number;

  viewProducts : ProductViewModel[] = [];

  changeType(type : string){
    this.selectedSubject = type;
    this.isComplete = false;

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

  sendReport(){
    switch(this.selectedSubject){
      case "По артикулу":
        this.sendProducts();
        break;
      case "По размеру":
        this.sendSizes();
        break;
    }
  }

  private sendSizes(){
    this.isLoad = true;
    let sizes : SizeSendModel[] = [];

    this.viewProducts
      .forEach(product => {
        if(product.editableSizePrice == false){
          return;
        }

        product.sizes
          .forEach(size => {
            if(size.canEdit && size.price != size.lastPrice){
              const sendSize : SizeSendModel = {sizeId : size.sizeId, price : size.price, article : product.article}
              sizes.push(sendSize);
            }
          })
      })

    this.priceService
      .sendSizes(this.connectionId, sizes)
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        complete : () => {
          this.viewProducts
            .forEach(product => {
              if(product.editableSizePrice == false){
                return;
              }

              product.sizes
                .forEach(size => {
                  const sizeUtil = new SizeUtility(product, size);
                  sizeUtil.setLastPrice(size.price);
                })
            })
          this.viewProducts = [];
          this.isComplete = true;
        }
      })
  }

  private sendProducts(){
    this.isLoad = true;
    let products : ProductSendModel[] = this.viewProducts
      .map(x=> {
        const price = x.price != x.lastPrice ? x.price : null;
        const discount = x.discount != x.lastDiscount ? x.discount : null;
        
        return {article : x.article, price : price, discount : discount}
      })

    this.priceService
      .sendProducts(this.connectionId, products)
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        complete : () => {
          this.viewProducts
            .forEach(x=> {
              const productUtil = new ProductUtility(x);
              productUtil.setLastDiscount(x.discount);
              productUtil.setLastPrice(x.price);
            })
          this.viewProducts = [];
          this.isComplete = true;
        }
      })
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
