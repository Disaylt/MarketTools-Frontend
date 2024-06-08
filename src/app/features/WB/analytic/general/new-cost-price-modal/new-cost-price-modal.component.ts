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
import { CostPriceService } from '../services/cost-price.service';
import { ComissionRquestBody } from '../card/models/comission-request-body';
import { CostPriceRequestBody } from '../models/cosst-price-request-body';
import { finalize } from 'rxjs';

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

  selectedSize : SizeModel | null = null;

  isLoad : boolean = false;
  selectedCalendarType : CalendarType = CalendarType.allDate;

  constructor(public dialogRef: DialogRef<any>, private costPriceService : CostPriceService){}

  costPrice : number = 0;

  send(){
    this.isLoad = true;

    const body : CostPriceRequestBody = {
      id : 0,
      startDate : null,
      endDate : null,
      value : this.costPrice
    };

    switch(this.selectedCalendarType){
      case CalendarType.afterDate:
        body.startDate = this.onlyDate;
        break;
      case CalendarType.beforeDate:
        body.endDate = this.onlyDate;
        break;
      case CalendarType.rangeDate:
        body.startDate = this.rangeDate[0]
        body.endDate = this.rangeDate[1]
        break;
    }

    if(this.selectedSize){
      body.id = this.selectedSize.id

      this.costPriceService
        .sendBySize(body)
        .pipe(finalize(( )=> {
          this.isLoad = false;
        }))
        .subscribe({
          complete : () => {
            this.dialogRef.close()
          }
        })
    }
    else{
      body.id = this.card.id

      this.costPriceService
        .sendByCard(body)
        .pipe(finalize(( )=> {
          this.isLoad = false;
        }))
        .subscribe({
          complete : () => {
            this.dialogRef.close()
          }
        })
    }
  }

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
