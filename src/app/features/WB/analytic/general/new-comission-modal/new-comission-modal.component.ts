import { Component } from '@angular/core';
import { AnalyticCardModel, WbComissionByCardCategory } from '../cards/models/card.model';
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
import { ComissionService } from '../card/services/comission.service';
import { ComissionRquestBody } from '../card/models/comission-request-body';
import { finalize } from 'rxjs';

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
  card : AnalyticCardModel | null = null;
  connectionId : number | null = null;

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

  constructor(public dialogRef: DialogRef<any>, private comissionService :ComissionService){
    
  }

  send(value : WbComissionByCardCategory){
    this.isLoad = true;

    const body : ComissionRquestBody = {
      id : 0,
      startDate : null,
      endDate : null,
      value : value
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

    if(this.card){
      body.id = this.card.id;

      this.comissionService
      .sendByCard(body)
      .pipe(finalize(( )=> {
        this.isLoad = false;
      }))
      .subscribe({
        complete : () => {
          this.dialogRef.close()
        }
      })

      return;
    }

    if(this.connectionId){
      body.id = this.connectionId;

      this.comissionService
      .sendByConnection(body)
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
