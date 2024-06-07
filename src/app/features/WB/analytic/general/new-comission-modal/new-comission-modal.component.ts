import { Component } from '@angular/core';
import { WbComissionByCardCategory } from '../cards/models/card.model';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComissionTypeStorage } from '../consts/comission-type.const';
import { CalendarTypeStorage } from '../consts/calendar-type.const';
import { CalendarType } from '../enums/calendar-type.enums';
import { CalendarModule } from 'primeng/calendar';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-new-comission-modal',
    standalone: true,
    templateUrl: './new-comission-modal.component.html',
    styleUrl: './new-comission-modal.component.scss',
    imports: [ModalComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, CalendarModule, SpinerComponent]
})
export class NewComissionModalComponent {

  comissionNames = ComissionTypeStorage;
  calendarNames = CalendarTypeStorage;

  isLoad : boolean = false;

  calendarTypes : CalendarType[] = [
    CalendarType.afterDate,
    CalendarType.beforeDate,
    CalendarType.allDate,
    CalendarType.rangeDate
  ]
  selectedCalendarType : CalendarType = CalendarType.allDate;

  comissionTypes : WbComissionByCardCategory[] = [
    WbComissionByCardCategory.paidStorage,
    WbComissionByCardCategory.marketplace,
    WbComissionByCardCategory.supplier,
    WbComissionByCardCategory.supplierExpress,
  ]
  selectedcomissionType : WbComissionByCardCategory | null = null;

  onlyDate : Date = new Date();
  rangeDate : Date[] = [];

  constructor(public dialogRef: DialogRef<any>){
    
  }

  send(){
    this.isLoad = true;
  }

  isShowRangeCalendar(value : CalendarType) : boolean{
    return value == CalendarType.rangeDate;
  }

  isShowOnlyDateCalendar(value : CalendarType) : boolean{
    return value == CalendarType.afterDate || value == CalendarType.beforeDate;
  }

  selectCalendarType(value : CalendarType){
    this.selectedCalendarType = value;
  }

  selectComissionType(comissionType : WbComissionByCardCategory){
    this.selectedcomissionType = comissionType;
  }
}
