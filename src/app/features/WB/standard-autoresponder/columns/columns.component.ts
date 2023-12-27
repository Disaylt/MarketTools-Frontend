import { Component } from '@angular/core';
import { IconButtonComponent } from "../../../../shared/components/buttons/icon-button/icon-button.component";
import { ColumnType } from './models/column-type.model';
import { ColumnTypeStorage } from './constants/column-type.storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-columns',
    standalone: true,
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    imports: [IconButtonComponent, CommonModule, FormsModule]
})
export class ColumnsComponent {

  columnTypes : ColumnType[] = ColumnTypeStorage.value;
  selectColumnType : ColumnType = ColumnTypeStorage.value[0];
  
}
