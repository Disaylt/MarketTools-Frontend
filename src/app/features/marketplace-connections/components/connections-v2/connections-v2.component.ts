import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from "../../../../shared/components/progress-bar/progress-bar.component";
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationBarComponent } from '../../../../shared/components/pagination-bar/pagination-bar.component';
import { ConnectionComponent } from '../connection/connection.component';
import { MarketplaceConnectionV2Service } from '../../services/marketplace-connection-v2.service';
import { BaseConnectionModel } from '../../models/marketplace-connection.model';
import { BaseConnectionV2 } from '../../models/marketplace-connections-v2.models';
import { MarketDeterminantService } from '../../../../core/services/market-determinant.service';
import { finalize } from 'rxjs';
import { NewConnectionModalComponent } from "../new-connection-modal/new-connection-modal.component";

@Component({
    selector: 'app-connections-v2',
    standalone: true,
    templateUrl: './connections-v2.component.html',
    styleUrl: './connections-v2.component.scss',
    imports: [ProgressBarComponent, FormsModule, CommonModule, PaginationBarComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, ConnectionComponent, NewConnectionModalComponent]
})
export class ConnectionsV2Component implements OnInit {

  isLoad : boolean = false;
  activeStatusFilter = {
    isHideActive : false,
    isHideInactive : false
  }

  connections : BaseConnectionV2[] = []

  constructor(private connectionsService : MarketplaceConnectionV2Service, private determinantService : MarketDeterminantService){}

  ngOnInit(): void {
    this.isLoad = true;
    this.connectionsService
      .getRange(this.determinantService.getRequired().nameEnum)
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        next: data => {
          this.connections = data;
        }
      })
  }

}
