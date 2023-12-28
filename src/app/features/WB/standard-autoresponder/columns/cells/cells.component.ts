import { Component } from '@angular/core';
import { IconButtonComponent } from "../../../../../shared/components/buttons/icon-button/icon-button.component";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cells',
    standalone: true,
    templateUrl: './cells.component.html',
    styleUrl: './cells.component.scss',
    imports: [IconButtonComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class CellsComponent {
    
}
