import { Component } from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cells',
    standalone: true,
    templateUrl: './cells.component.html',
    styleUrl: './cells.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class CellsComponent {
    
}
