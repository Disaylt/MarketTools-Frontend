import { Component } from '@angular/core';
import { CalendarType } from '../enums/calendar-type.enums';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-cost-price-modal',
  standalone: true,
  imports: [],
  templateUrl: './new-cost-price-modal.component.html',
  styleUrl: './new-cost-price-modal.component.scss'
})
export class NewCostPriceModalComponent {
  calendarTypes : CalendarType[] = [
    CalendarType.afterDate,
    CalendarType.beforeDate,
    CalendarType.allDate,
    CalendarType.rangeDate
  ]
  selectedCalendarType : CalendarType = CalendarType.allDate;

  constructor(public dialogRef: DialogRef<any>){}
}
