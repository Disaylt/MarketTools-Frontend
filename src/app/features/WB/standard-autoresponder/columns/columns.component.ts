import { Component, OnInit } from '@angular/core';
import { ColumnType } from './models/column-type.model';
import { ColumnTypeStorage } from './constants/column-type.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column, NewColumn } from './models/column.models';
import { CellsComponent } from "./cells/cells.component";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ColumnsService } from './services/columns.service';
import { finalize, pipe } from 'rxjs';
import { ViewMappingService } from '../../../../core/services/view-mapping.service';
import { ViewResult } from '../../../../core/models/view-result.model';
import { SpinerComponent } from "../../../../shared/components/spiner/spiner.component";
import { RecommendationBindWordsComponent } from "./recommendation-bind-words/recommendation-bind-words.component";

@Component({
    selector: 'app-columns',
    standalone: true,
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    imports: [CommonModule, FormsModule, CellsComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, SpinerComponent, RecommendationBindWordsComponent]
})
export class ColumnsComponent implements OnInit {

  isLoad : boolean = true;

  columnTypes : ColumnType[] = ColumnTypeStorage.value;
  selectedColumnType : ColumnType = ColumnTypeStorage.value[0];
  
  isAddingNewColumn : boolean = false;
  selectedColumn : ViewResult<Column> | null = null;
  columns : ViewResult<Column>[] = []

  newColumnName : string = "";

  constructor(private columnsService : ColumnsService, private viewMapper : ViewMappingService){}

  ngOnInit(): void {
    this.loadColumns();
  }

  selectColumn(column : ViewResult<Column>){
    this.selectedColumn = column;
    
  }

  delete(column : ViewResult<Column>){
    column.actions.isLoad = true;
    
    this.columnsService.deleteColumn(column.data.id)
      .pipe(
        finalize(() => {
          column.actions.isLoad = false;
        })
      )
      .subscribe(
        {
          complete : () => {
            this.columns = this.columns
              .filter(x=> x != column);
            
            if(this.selectedColumn == column){
              this.selectedColumn = null;
            }
          }
        }
      )
  }

  add(){
    const type = this.selectedColumnType.id;
    this.isAddingNewColumn = true;

    const newColumn : NewColumn = {
      name : this.newColumnName,
      type : type
    };

    this.columnsService.add(newColumn)
      .pipe(
        finalize(() => {
          this.isAddingNewColumn = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            const column = this.viewMapper.map(data);
            if(this.selectedColumnType.id == type){
              this.columns.push(column);
            }
          },
          complete: () => {
            this.newColumnName = "";
          }
        }
      )
  }

  loadColumns(){
    this.isLoad = true;
    this.selectedColumn = null;

    this.columnsService.getRange(this.selectedColumnType.id)
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : (data) => {
          this.columns = data.map(x=> {
            return this.viewMapper.map(x);
          })
        }
      })
  }

}
