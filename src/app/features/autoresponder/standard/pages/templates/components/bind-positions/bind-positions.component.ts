import { Component, Input } from '@angular/core';
import { TabBarComponent } from "../../../../../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ColumnsService } from '../../../columns/services/columns.service';
import { BindPositionsService } from './services/bind-positions.service';
import { Observable, finalize, switchMap } from 'rxjs';
import { Column } from '../../../columns/models/column.models';
import { ColumnType } from '../../../../../../../core/enums/columns-type.enum';
import { ProgressBarComponent } from "../../../../../../../shared/components/progress-bar/progress-bar.component";
import { BindPositionModel } from './models/bind-position.model';
import { ColumnTypeModel } from '../../../../../../../core/models/column-type.model';
import { ColumnTypesStorage } from '../../../../../../../core/constants/column-types.storage';

@Component({
    selector: 'app-bind-positions',
    standalone: true,
    templateUrl: './bind-positions.component.html',
    styleUrl: './bind-positions.component.scss',
    imports: [TabBarComponent, TabBarButtonComponent, CdkDropList, CdkDrag, CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, ProgressBarComponent]
})
export class BindPositionsComponent {
  
  private _templateId! : number;
  @Input({required : true})
  set templateId(value : number){
    this._templateId = value;
    this.load();
  }

  columnTypes : ColumnTypeModel[] = ColumnTypesStorage.value;
  selectedColumnType : ColumnType = ColumnType.standard;
  isLoad : boolean = false;
  
  inactiveColumns : Column[] = [];
  activeColumns : Column[] = [];

  constructor(private columnsService : ColumnsService, private bindPositionsService : BindPositionsService){}

  changeColumnType(columnType : number){
    this.selectedColumnType = columnType;
    this.load();
  }

  drop(event: CdkDragDrop<Column[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    if(event.previousContainer.id == "activeColumns" || event.container.id == "activeColumns"){
      this.changeBindPositions();
    }
  }

  private changeBindPositions(){
    this.isLoad = true;
    const requestTemplateId = this._templateId;
    const requestColumnType = this.selectedColumnType;

    let indexPosition = 0;
    const bindPositions : BindPositionModel[] = this.activeColumns
      .map(column => {
        indexPosition += 1;
        return {columnId : column.id, position : indexPosition}
      })

    this.bindPositionsService.updateRange(requestColumnType, requestTemplateId, bindPositions)
      .pipe(
        finalize(() => {
          if(requestTemplateId == this._templateId && requestColumnType == this.selectedColumnType){
            this.isLoad = false;
          }
        })
      )
      .subscribe({
        error : () => {
          if(requestTemplateId == this._templateId && requestColumnType == this.selectedColumnType){
            this.load();
          }
        }
      });
  }

  private load(){
    const requestTemplateId = this._templateId;
    const requestColumnType = this.selectedColumnType;

    this.isLoad = true;

    this.columnsService.getRange(requestColumnType)
      .pipe(
        switchMap(value => {
          if(requestTemplateId == this._templateId && requestColumnType == this.selectedColumnType){
            this.inactiveColumns = value;
          }
          
          return this.bindPositionsService.getRange(requestColumnType, requestTemplateId);
        }),
        finalize(() => {
          if(requestTemplateId == this._templateId && requestColumnType == this.selectedColumnType){
            this.isLoad = false;
          }
        })
      )
      .subscribe({
        next : data => {
          if(requestTemplateId == this._templateId && requestColumnType == this.selectedColumnType){
            this.activeColumns = [];
            data.sort((first, second) => (first.position < second.position ? -1 : 1))
              .forEach(bindPosition=> {
                console.log(bindPosition)
                const activeColumn = this.inactiveColumns.find(inactiveColumn => inactiveColumn.id == bindPosition.columnId);
                if(activeColumn){
                  this.activeColumns.push(activeColumn);
                  this.inactiveColumns = this.inactiveColumns.filter(inactiveColumn => inactiveColumn != activeColumn);
                }
              })
          }
        },
        error : () => {
          this.inactiveColumns = []
        }
      });
  }
}
