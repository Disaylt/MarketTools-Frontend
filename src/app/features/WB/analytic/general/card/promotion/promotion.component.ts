import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Promotion } from '../../cards/models/card.model';
import { DatePromotionColumns, PromotionColumn, PromotionRow } from '../../cards/models/table.model';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem],
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
})
export class PromotionComponent implements OnInit, OnChanges {
  
  @Input({required : true}) promotions : Promotion[] = [];
  @Input({required : true}) analyticDatesType : string = "Дни";
  @Input({required : true}) dates : Date[] = [];

  promotionsRow : PromotionRow[] = [];

  ngOnInit(): void {
    this.loadColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["analyticDatesType"]){
      this.loadColumns();
    }
  }

  loadColumns(){
    const promotionRows : PromotionRow[] = [];

    const startDate = this.dates[0];
    startDate.setHours(0,0,0,0);
    const endDate = this.dates[1];
    endDate.setHours(0,0,0,0);

    this.promotions
      .forEach(x=> {
        const promotion : PromotionRow = {
          name : x.name,
          columns : []
        };

        const columns : PromotionColumn[] = [];
        for(let indexDate = endDate; indexDate >= startDate; indexDate = new Date(indexDate.getTime() - (1000 * 60 * 60 * 24))){
          const dateForCompare = indexDate.setHours(0,0,0,0);

          const column : PromotionColumn = {
            date : indexDate,
            title : indexDate.toLocaleDateString(),
            value : this.getCost(x, dateForCompare)
          }

          columns.push(column);
        }

        if(columns.some(x=> x.value > 0)){
          promotionRows.push(promotion);

          switch(this.analyticDatesType){
            case "Недели":
              promotion.columns = this.getWeeksColumns(columns)
                .map(x=> this.combineColumns(x));
              break;
            case "Месяцы":
              promotion.columns = this.getMounthColumns(columns)
                .map(x=> this.combineColumns(x));
              break;
            default:
              promotion.columns = columns;
          }
        }
      })

      this.promotionsRow = promotionRows;
  }

  private combineColumns(dateColumn : DatePromotionColumns) : PromotionColumn{
    const startDate = dateColumn.startDate?.toLocaleDateString() ?? this.dates[0].toLocaleDateString();
    const endDate = dateColumn.endDate?.toLocaleDateString() ?? this.dates[1].toLocaleDateString();

    const result : PromotionColumn = {
      title : endDate + " - " + startDate,
      date : new Date(),
      value : dateColumn.columns.map(x=> x.value).reduce((sum, current) => sum + current, 0)
    }

    return result;
  }

  private getMounthColumns(columnsForEveryDay : PromotionColumn[]) : DatePromotionColumns[]{
    
    const mountColumns : DatePromotionColumns[] = [];

    for(const column of columnsForEveryDay){
      const mounth = column.date.getMonth();
      let dateColumn = mountColumns.find(x=> x.dateValue == mounth);

      if(dateColumn == undefined){
        const startDate = new Date(column.date.getFullYear(), column.date.getMonth() + 1, 0)
        const endDate = new Date(column.date.getFullYear(), column.date.getMonth())
        dateColumn = {dateValue : mounth, columns : [], startDate : startDate, endDate : endDate}
        mountColumns.push(dateColumn);
      }
      dateColumn.columns.push(column)
    }

    return mountColumns;
  }

  private getWeeksColumns(columnsForEveryDay : PromotionColumn[]) : DatePromotionColumns[]{
    let weekIndex = 0;
    const weekColumns : DatePromotionColumns[] = []

    for(const column of columnsForEveryDay){
      let dateColumn = weekColumns.find(x=> x.dateValue == weekIndex);
      if(dateColumn == undefined){
        dateColumn = {dateValue : weekIndex, columns : [], startDate : null, endDate : null}
        weekColumns.push(dateColumn);
      }

      dateColumn.columns.push(column);

      if(column.date.getDay() == 0){
        dateColumn.startDate = column.date;
        weekIndex += 1;
      }

      if(column.date.getDay() == 6){
        dateColumn.endDate = column.date;
      }
    }

    return weekColumns;
  }

  private getCost(promotion : Promotion, date : number) : number{

    const history = promotion.cardUseHistories
      .find(x=> new Date(x.date).setHours(0,0,0,0) == date) ?? null;

    if(history == null || history.isUseCurrentCard == false || history.totalCards < 1){
      return 0;
    }

    const cost = promotion.dayReports
      .find(x=> new Date(x.date).setHours(0,0,0,0) == date)?.price ?? 0;

    return cost / history.totalCards;
  }
}
