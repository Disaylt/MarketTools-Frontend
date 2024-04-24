import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductViewModel } from '../models/product-view.model';

@Component({
  selector: 'app-checker',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule],
  templateUrl: './checker.component.html',
  styleUrl: './checker.component.scss'
})
export class CheckerComponent {
  @Input({required : true}) products! : ProductViewModel[];
  @Input({required : true}) filterProducts! : ProductViewModel[];
  @Input({required : true}) viewProducts! : ProductViewModel[];

  @Output() changed : EventEmitter<void> = new EventEmitter();

  changeProducts(products : ProductViewModel[], isCheck : boolean){
    products.forEach(x=> {
      x.isCheck = isCheck;
    })
    this.changed.emit();
  }
}
