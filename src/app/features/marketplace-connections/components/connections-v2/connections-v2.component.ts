import { Component } from '@angular/core';
import { ProgressBarComponent } from "../../../../shared/components/progress-bar/progress-bar.component";
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationBarComponent } from '../../../../shared/components/pagination-bar/pagination-bar.component';
import { ConnectionComponent } from '../connection/connection.component';

@Component({
    selector: 'app-connections-v2',
    standalone: true,
    templateUrl: './connections-v2.component.html',
    styleUrl: './connections-v2.component.scss',
    imports: [ProgressBarComponent, FormsModule, CommonModule, PaginationBarComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, ConnectionComponent]
})
export class ConnectionsV2Component {

  isLoad : boolean = false;
  activeStatusFilter = {
    isHideActive : false,
    isHideInactive : false
  }

  test = [1,2,3,3,3,3,3,3,3,3,3,3,3,33,3]

}
