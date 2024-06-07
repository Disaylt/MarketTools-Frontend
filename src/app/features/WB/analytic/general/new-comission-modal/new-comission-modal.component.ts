import { Component } from '@angular/core';
import { WbComissionByCardCategory } from '../cards/models/card.model';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComissionTypeStorage } from '../consts/comission-type.const';

@Component({
    selector: 'app-new-comission-modal',
    standalone: true,
    templateUrl: './new-comission-modal.component.html',
    styleUrl: './new-comission-modal.component.scss',
    imports: [ModalComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule]
})
export class NewComissionModalComponent {

  comissionNames = ComissionTypeStorage;
  calendarTypes : string[] = [
    "За всё время",
    "От выбранной даты",
    "До выбранной даты",
    "Диапазон дат"
  ]

  comissionTypes : WbComissionByCardCategory[] = [
    WbComissionByCardCategory.paidStorage,
    WbComissionByCardCategory.marketplace,
    WbComissionByCardCategory.supplier,
    WbComissionByCardCategory.supplierExpress,
  ]
  selectedcomissionType : WbComissionByCardCategory | null = null;

  constructor(public dialogRef: DialogRef<any>){
    
  }

  selectComissionType(comissionType : WbComissionByCardCategory){
    this.selectedcomissionType = comissionType;
  }
}
