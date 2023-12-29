import { Component } from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";

@Component({
    selector: 'app-cells',
    standalone: true,
    templateUrl: './cells.component.html',
    styleUrl: './cells.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, ProgressBarComponent]
})
export class CellsComponent {
    
}
