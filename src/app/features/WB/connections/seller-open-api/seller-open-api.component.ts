import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { NewConnectionModalComponent } from './components/new-connection-modal/new-connection-modal.component';
import { MarketplaceConnectionsService } from '../../../marketplace-connections/services/marketplace-connections.service';
import { MarketplaceConnectionType } from '../../../../core/enums/marketplace-connection.enum';
import { MarketplaceConnectionModel } from '../../../marketplace-connections/models/marketplace-connection.model';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../../shared/components/progress-bar/progress-bar.component";
import { finalize } from 'rxjs';
import { PaginationBarComponent } from "../../../../shared/components/pagination-bar/pagination-bar.component";
import { ActiveFilter } from '../../../../shared/pipes/models/active-filter.model';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { FormsModule } from '@angular/forms';
import { MarketDeterminantService } from '../../../../core/services/market-determinant.service';
import { WbSellerOpenApiConnectionComponent } from "./components/wb-seller-open-api-connection/wb-seller-open-api-connection.component";
import { ConnectionComponent } from "../../../marketplace-connections/components/connection/connection.component";
import { RefreshTokenModalComponent } from './components/refresh-token-modal/refresh-token-modal.component';

@Component({
    selector: 'app-seller-open-api',
    standalone: true,
    templateUrl: './seller-open-api.component.html',
    styleUrl: './seller-open-api.component.scss',
    imports: [FormsModule, CommonModule, ProgressBarComponent, PaginationBarComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, WbSellerOpenApiConnectionComponent, ConnectionComponent]
})
export class SellerOpenApiComponent implements OnInit {

  isLoad : boolean = false;
  connections : MarketplaceConnectionModel[] = [];
  activeStatusFilter = {
    isHideActive : false,
    isHideInactive : false
  }

  constructor(private dialog: Dialog, 
    private marketplaceConnectionService : MarketplaceConnectionsService,
    private marketplaceDeterminantService : MarketDeterminantService){}

  ngOnInit(): void {
    this.isLoad = true;

    this.marketplaceConnectionService.getRangeByType(MarketplaceConnectionType.openApi, this.marketplaceDeterminantService.marketplace.nameEnum)
      .pipe(
        finalize(()=> {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.connections = data;
        }
      })
  }

  openChangeDataModal(data : MarketplaceConnectionModel){
    const modal = this.dialog.open(RefreshTokenModalComponent);
      if(modal.componentInstance){
        modal.componentInstance.data = data;
      }
      else{
        modal.close();
      }
  }

  changeShowActiveFilter(){
    if(this.activeStatusFilter.isHideActive){
      this.activeStatusFilter.isHideInactive = false;
    }
  }

  changeShowInactiveFilter(){
    if(this.activeStatusFilter.isHideInactive){
      this.activeStatusFilter.isHideActive = false;
    }
  }

  delete(id : number){
    this.connections = this.connections.filter(x=> x.id != id);
  }

  openAddModal(){
    const modal = this.dialog.open(NewConnectionModalComponent);
    modal.closed.subscribe({
      next : data => {
        const newConnection = data as MarketplaceConnectionModel;

        if(newConnection){
          this.connections.unshift(newConnection);
        }
      }
    })
  }
}
