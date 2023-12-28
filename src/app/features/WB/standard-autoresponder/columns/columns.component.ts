import { Component, OnInit } from '@angular/core';
import { ColumnType } from './models/column-type.model';
import { ColumnTypeStorage } from './constants/column-type.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column } from './models/column.models';
import { CellsComponent } from "./cells/cells.component";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ColumnsService } from './services/columns.service';
import { finalize } from 'rxjs';
import { ViewMappingService } from '../../../../core/services/view-mapping.service';
import { ViewResult } from '../../../../core/models/view-result.model';

@Component({
    selector: 'app-columns',
    standalone: true,
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    imports: [CommonModule, FormsModule, CellsComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem]
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

  addColumn(){
    
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
