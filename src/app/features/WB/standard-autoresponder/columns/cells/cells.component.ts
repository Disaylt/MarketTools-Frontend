import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cells',
    standalone: true,
    templateUrl: './cells.component.html',
    styleUrl: './cells.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, ProgressBarComponent, CommonModule, FormsModule]
})
export class CellsComponent {
    
    private _columnId : number | null = null;

    @Input()
    set columnId(value : number | null){
        this._columnId = value;
        console.log(value);
    }

    isLoad : boolean = false;

    
}
