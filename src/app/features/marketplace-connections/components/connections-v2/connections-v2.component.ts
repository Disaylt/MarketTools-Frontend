import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { finalize, forkJoin, merge } from 'rxjs';
import { NewConnectionModalComponent } from "../new-connection-modal/new-connection-modal.component";
import { ConnectionV2Component } from "../connection-v2/connection-v2.component";
import { ArchitectureService } from '../../services/architecture.service';
import { ArchitectureModel } from '../../models/architecture.model';

@Component({
    selector: 'app-connections-v2',
    standalone: true,
    templateUrl: './connections-v2.component.html',
    styleUrl: './connections-v2.component.scss',
    imports: [ProgressBarComponent, FormsModule, CommonModule, PaginationBarComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, ConnectionComponent, NewConnectionModalComponent, ConnectionV2Component]
})
export class ConnectionsV2Component implements OnInit {

  isLoad : boolean = false;
  activeStatusFilter = {
    isHideActive : false,
    isHideInactive : false
  }

  connections : BaseConnectionV2[] = []
  architectureServices : ArchitectureModel | null = null;

  constructor(private connectionsService : MarketplaceConnectionV2Service, 
    private determinantService : MarketDeterminantService,
    private architectureService : ArchitectureService){}

  ngOnInit(): void {
    this.isLoad = true;

    const architectureServices = this.architectureService
      .get(this.determinantService.getRequired().nameEnum);

    const connections = this.connectionsService
      .getRange(this.determinantService.getRequired().nameEnum);

    forkJoin([architectureServices, connections])
      .pipe(finalize(() => {
        this.isLoad = false;
      }))
      .subscribe({
        next : data => {
          this.connections = data[1];
          this.architectureServices = data[0];
        },
        error : () => {
          this.connections = [];
          this.architectureServices = null;
        }
      })
  }

  addNewConnection(value : BaseConnectionV2){
    console.log(value);
    this.connections.push(value);
  }

}
