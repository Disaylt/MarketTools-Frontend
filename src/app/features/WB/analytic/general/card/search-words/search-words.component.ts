import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import { AnalyticCardModel, SearchWord } from '../../cards/models/card.model';
import { DateSearchWordColumns, SearchWordColumn, SearchWordRow } from '../../cards/models/table.model';
import { SearchWordsService } from '../services/search-words.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-search-words',
    standalone: true,
    templateUrl: './search-words.component.html',
    styleUrl: './search-words.component.scss',
    imports: [CommonModule,
        FormsModule,
        CdkMenuTrigger,
        CdkMenu,
        CdkMenuItem, SpinerComponent]
})
export class SearchWordsComponent implements OnInit, OnChanges {
  
  isLoadAddButton = false;
  newWord: string = "";

  @Input({required : true}) card! : AnalyticCardModel;
  @Input({required : true}) analyticDatesType : string = "Дни";
  @Input({required : true}) dates : Date[] = [];

  rows : SearchWordRow[] = []

  constructor(private searchWordsService : SearchWordsService){}

  ngOnInit(): void {
    this.loadColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["analyticDatesType"]){
      this.loadColumns();
    }
  }

  loadColumns(){
    const rows : SearchWordRow[] = []

    const startDate = this.dates[0];
    startDate.setHours(0,0,0,0);
    const endDate = this.dates[1];
    endDate.setHours(0,0,0,0);

    this.card
      .searchWords
      .forEach(x=> {
        const row : SearchWordRow = {
          name : x.name,
          id : x.id,
          columns : []
        };

        const columns : SearchWordColumn[] = []

        for(let indexDate = endDate; indexDate >= startDate; indexDate = new Date(indexDate.getTime() - (1000 * 60 * 60 * 24))){
          const dateForCompare = indexDate.setHours(0,0,0,0);
          
          const column : SearchWordColumn = {
            date : indexDate,
            title : indexDate.toLocaleDateString(),
            value : this.getPosition(x, dateForCompare)
          }

          columns.push(column)
        }

        rows.push(row);

          switch(this.analyticDatesType){
            case "Недели":
              row.columns = this.getWeeksColumns(columns)
                .map(x=> this.combineColumns(x));
              break;
            case "Месяцы":
              row.columns = this.getMounthColumns(columns)
                .map(x=> this.combineColumns(x));
              break;
            default:
              row.columns = columns;
          }
      })

      this.rows = rows;
  }

  add() {
    this.isLoadAddButton = true;
    this.searchWordsService
      .addWord(this.card.id, this.newWord)
      .pipe(finalize(() => {
        this.isLoadAddButton = false;
      }))
      .subscribe({
        next : data =>{
          this.card.searchWords.push({name : data.name, id : data.id, historyPositions : []})
          this.loadColumns();
          this.newWord = "";
        }
      })
    }

  delete(id : number){
    this.searchWordsService
      .delete(id)
      .subscribe({
        complete : () => {
          this.card.searchWords = this.card.searchWords
            .filter(x=> x.id != id);
          this.loadColumns();
        }
      })
  }
  
    private combineColumns(dateColumn : DateSearchWordColumns) : SearchWordColumn{
      const startDate = dateColumn.startDate?.toLocaleDateString() ?? this.dates[0].toLocaleDateString();
      const endDate = dateColumn.endDate?.toLocaleDateString() ?? this.dates[1].toLocaleDateString();
  
      const positions : number[] = []

      dateColumn.columns
        .forEach(x=> {
          if(x.value){
            positions.push(x.value)
          }
        })

      const result : SearchWordColumn = {
        title : endDate + " - " + startDate,
        date : new Date(),
        value : positions.length > 0 ? positions.reduce((sum, current) => sum + current, 0) / positions.length : null
      }
  
      return result;
    }
  
    private getMounthColumns(columnsForEveryDay : SearchWordColumn[]) : DateSearchWordColumns[]{
      
      const mountColumns : DateSearchWordColumns[] = [];
  
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
  
    private getWeeksColumns(columnsForEveryDay : SearchWordColumn[]) : DateSearchWordColumns[]{
      let weekIndex = 0;
      const weekColumns : DateSearchWordColumns[] = []
  
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

  private getPosition(value : SearchWord, date : number) : number | null{
    return value.historyPositions
      .find(x=> new Date(x.date).setHours(0,0,0,0) == date)?.value ?? null;
  }
}
