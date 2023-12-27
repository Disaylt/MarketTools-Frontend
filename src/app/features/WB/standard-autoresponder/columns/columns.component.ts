import { Component } from '@angular/core';
import { IconButtonComponent } from "../../../../shared/components/buttons/icon-button/icon-button.component";
import { ColumnType } from './models/column-type.model';
import { ColumnTypeStorage } from './constants/column-type.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Column } from './models/column.models';

@Component({
    selector: 'app-columns',
    standalone: true,
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    imports: [IconButtonComponent, CommonModule, FormsModule]
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
    },
    {
      name : "test 3",
      id : 2
    },
    {
      name : "test 4",
      id : 3
    }
  ]

  selectColumn(column : Column){
    this.selectedColumn = column;
  }

}
