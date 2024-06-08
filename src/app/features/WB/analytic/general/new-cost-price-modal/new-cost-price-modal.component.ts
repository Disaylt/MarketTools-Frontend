import { Component } from '@angular/core';
import { CalendarType } from '../enums/calendar-type.enums';
import { DialogRef } from '@angular/cdk/dialog';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CalendarModule } from 'primeng/calendar';
import { CalendarTypeStorage } from '../consts/calendar-type.const';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { AnalyticCardModel, SizeModel } from '../cards/models/card.model';

@Component({
    selector: 'app-new-cost-price-modal',
    standalone: true,
    templateUrl: './new-cost-price-modal.component.html',
    styleUrl: './new-cost-price-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, CalendarModule, SpinerComponent]
})
export class NewCostPriceModalComponent {
  calendarTypes : CalendarType[] = [
    CalendarType.afterDate,
    CalendarType.beforeDate,
    CalendarType.allDate,
    CalendarType.rangeDate
  ]
  calendarNames = CalendarTypeStorage;
  onlyDate : Date = new Date();
  rangeDate : Date[] = [];

  card! : AnalyticCardModel;

  sizes : SizeModel[] = []
  selectedSize : SizeModel | null = null;

  isLoad : boolean = false;
  selectedCalendarType : CalendarType = CalendarType.allDate;

  constructor(public dialogRef: DialogRef<any>){}

  costPrice : number = 0;

  selectSize(value : SizeModel | null){
    this.selectedSize = value;
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

}
