import { Component } from '@angular/core';
import { ColumnType } from './models/column-type.model';
import { ColumnTypeStorage } from './constants/column-type.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column } from './models/column.models';
import { CellsComponent } from "./cells/cells.component";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ColumnsService } from './services/columns.service';

@Component({
    selector: 'app-columns',
    standalone: true,
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    imports: [CommonModule, FormsModule, CellsComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class ColumnsComponent {

  columnTypes : ColumnType[] = ColumnTypeStorage.value;
  selectedColumnType : ColumnType = ColumnTypeStorage.value[0];
  
  selectedColumn : Column | null = null;
  columns : Column[] = [
    {
      name : "test 1 asd agsddgsdfgdsgf trydrtyhdfxgh drtfygsdrtsert das",
      id : 0
    },
    {
      name : "test 2",
      id : 1
    }
  ]

  constructor(private columnsService : ColumnsService){}

  selectColumn(column : Column){
    this.selectedColumn = column;
    
  }

}
