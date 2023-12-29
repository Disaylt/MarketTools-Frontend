import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellsService } from './services/cells.service';
import { Cell, NewCell } from './models/cell.model';
import { ViewResult } from '../../../../../core/models/view-result.model';
import { finalize } from 'rxjs';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-cells',
    standalone: true,
    templateUrl: './cells.component.html',
    styleUrl: './cells.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, ProgressBarComponent, CommonModule, FormsModule, SpinerComponent]
})
export class CellsComponent {
    
    private _columnId : number | null = null;

    @Input()
    set columnId(value : number | null){
        this._columnId = value;
        this.cells = [];
        if(value != null){
            this.load(value);
        }
    }

    get columnId(){
        return this._columnId;
    }

    isTryAdd : boolean = false;
    isLoad : boolean = false;
    cells : ViewResult<Cell>[] = [];
    textCell : string = "";

    constructor(private cellsService : CellsService, private mapService : ViewMappingService){}

    sendChanges(value : ViewResult<Cell>){
        value.actions.isLoad = true;

        this.cellsService.change(value.data)
            .pipe(
                finalize(() => {
                    value.actions.isLoad = false;
                })
            )
            .subscribe({
                next: (data) => {
                    value.data = data;
                    value.actions.isEdit = false;
                }
            })
    }

    startChange(value : ViewResult<Cell>){
        value.actions.isEdit = true;
    }

    delete(value : ViewResult<Cell>){
        value.actions.isLoad = true;
        value.actions.isDelete = true;

        this.cellsService.delete(value.data.id)
            .pipe(
                finalize(() => {
                    value.actions.isLoad = false;
                    value.actions.isDelete = true;
                })
            )
            .subscribe({
                complete: () => {
                    this.cells = this.cells
                        .filter(x=> x != value);
                }
            })
    }

    add(){
        if(this._columnId == null){
            return;
        }

        this.isTryAdd = true;
        const newCell : NewCell = {
            value : this.textCell,
            columnId : this._columnId
        }

        this.cellsService.create(newCell)
            .pipe(
                finalize(() => {
                    this.isTryAdd = false;
                    this.textCell = "";
                })
            )
            .subscribe({
                next: (data) => {
                    if(newCell.columnId === this._columnId){
                        const viewData = this.mapService
                            .map(data);
                        this.cells.push(viewData);
                    }
                    
                }
            })
    }

    private load(columnId : number){
        this.isLoad = true;

        this.cellsService.getRange(columnId)
            .pipe(
                finalize(() => {
                    if(this._columnId == columnId){
                        this.isLoad = false;
                    }
                })
            )
            .subscribe({
                next : (data) => {
                    this.cells = data
                        .map(x=> this.mapService.map(x));
                }
            })
    }
    
}
