import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { ProductViewModel, SizeViewModel } from '../models/product-view.model';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";

@Component({
    selector: 'app-report-modal',
    standalone: true,
    templateUrl: './report-modal.component.html',
    styleUrl: './report-modal.component.scss',
    imports: [ModalComponent, CommonModule, ProgressBarComponent]
})
export class ReportModalComponent{
  constructor(public dialogRef: DialogRef<any>){}

  isLoad : boolean = true;
  products : ProductViewModel[] = [];

  setProducts(products : ProductViewModel[]){
    this.products = products
      .filter(product => {
        return product.price != product.lastPrice
          || product.discount != product.lastDiscount
          || product.sizes.some(size => {
            return size.price != size.lastPrice;
          })
      })
    this.isLoad = false;
  }
}
