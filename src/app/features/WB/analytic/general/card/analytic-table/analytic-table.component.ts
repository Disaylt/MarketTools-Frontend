import { Component, Input, OnInit } from '@angular/core';
import { SizeModel } from '../../cards/models/card.model';
import { ColumnModel } from '../../cards/models/table.model';

@Component({
  selector: 'app-analytic-table',
  standalone: true,
  imports: [],
  templateUrl: './analytic-table.component.html',
  styleUrl: './analytic-table.component.scss'
})
export class AnalyticTableComponent implements OnInit {
  
  @Input({required : true}) sizes : SizeModel[] = [];
  @Input({required : true}) analyticDatesType : string = "Дни";
  @Input({required : true}) dates : Date[] = [];

  columns : ColumnModel[] = [];


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadAsync(){
    for(let indexDate = this.dates[1]; indexDate >= this.dates[0]; indexDate = new Date(indexDate.getTime() - (1000 * 60 * 60 * 24))){
      const dateForCompare = indexDate.setHours(0,0,0,0);

      const column : ColumnModel = {
        date : indexDate,
        title : indexDate.toLocaleDateString(),
        costPrice : this.sizes
          .map(size => size
            .prices
            .find(price => price
              .createDate
              .setHours(0,0,0,0) == dateForCompare)?.sellerPrice ?? 0)
          .reduce((sum, current) => sum + current, 0)
      }
      this.columns.push(column);
    }
  }
}
