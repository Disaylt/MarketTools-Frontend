import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CellsComponent } from './pages/cells/cells.component';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { SpinerComponent } from '../../../../../shared/components/spiner/spiner.component';
import { RecommendationVariablesClueComponent } from './components/recommendation-variables-clue/recommendation-variables-clue.component';
import { ViewResult } from '../../../../../core/models/view-result.model';
import { Column, NewColumn } from './models/column.models';
import { ColumnsService } from './services/columns.service';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { finalize } from 'rxjs';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NameFilterPipe } from "../../../../../shared/pipes/name-filter.pipe";
import { ViewNameFilterPipe } from "../../../../../shared/pipes/view-name-filter.pipe";
import { ColumnTypesStorage } from '../../../../../core/constants/column-types.storage';
import { ColumnTypeModel } from '../../../../../core/models/column-type.model';


@Component({
    selector: 'app-columns',
    standalone: true,
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    imports: [CommonModule, FormsModule, CellsComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, SpinerComponent, RecommendationVariablesClueComponent, RouterModule, RouterOutlet, RouterLink, NameFilterPipe, ViewNameFilterPipe]
})
export class ColumnsComponent {

  isLoad : boolean = true;

  columnTypes : ColumnTypeModel[] = ColumnTypesStorage.value;
  selectedColumnType : ColumnTypeModel = ColumnTypesStorage.value[0];
  
  isAddingNewColumn : boolean = false;
  selectedColumn : ViewResult<Column> | null = null;
  columns : ViewResult<Column>[] = []

  columnsSearchValue : string = "";
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
    const type = this.selectedColumnType.nameEnum;
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
            if(this.selectedColumnType.nameEnum == type){
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

    this.columnsService.getRange(this.selectedColumnType.nameEnum)
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
