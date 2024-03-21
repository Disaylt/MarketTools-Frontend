import { Component } from '@angular/core';
import { ProgressBarComponent } from "../../../../shared/components/progress-bar/progress-bar.component";
import { MarketplaceConnectionModel } from '../../../marketplace-connections/models/marketplace-connection.model';
import { Dialog } from '@angular/cdk/dialog';
import { MarketDeterminantService } from '../../../../core/services/market-determinant.service';
import { MarketplaceConnectionsService } from '../../../marketplace-connections/services/marketplace-connections.service';
import { MarketplaceConnectionType } from '../../../../core/enums/marketplace-connection.enum';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectionComponent } from '../../../marketplace-connections/components/connection/connection.component';
import { NewConnectionModalComponent } from './components/new-connection-modal/new-connection-modal.component';

@Component({
    selector: 'app-accounts',
    standalone: true,
    templateUrl: './accounts.component.html',
    styleUrl: './accounts.component.scss',
    imports: [FormsModule, CommonModule, ProgressBarComponent, ConnectionComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class AccountsComponent {
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

    this.marketplaceConnectionService.getRangeByType(MarketplaceConnectionType.account, this.marketplaceDeterminantService.getRequired().nameEnum)
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
    // const modal = this.dialog.open(RefreshTokenModalComponent);
    //   if(modal.componentInstance){
    //     modal.componentInstance.data = data;
    //   }
    //   else{
    //     modal.close();
    //   }
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
