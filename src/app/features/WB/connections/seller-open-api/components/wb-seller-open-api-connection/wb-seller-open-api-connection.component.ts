import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MarketplaceConnectionModel } from '../../../../../marketplace-connections/models/marketplace-connection.model';
import { SellerOpenApiConnectionsService } from '../../services/seller-open-api-connections.service';
import { MarketplaceConnectionsService } from '../../../../../marketplace-connections/services/marketplace-connections.service';
import { finalize } from 'rxjs';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Dialog } from '@angular/cdk/dialog';
import { RefreshTokenModalComponent } from '../refresh-token-modal/refresh-token-modal.component';

@Component({
    selector: 'app-wb-seller-open-api-connection',
    standalone: true,
    templateUrl: './wb-seller-open-api-connection.component.html',
    styleUrl: './wb-seller-open-api-connection.component.scss',
    imports: [SpinerComponent, CdkAccordionModule, CommonModule,CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class WbSellerOpenApiConnectionComponent {

  isLoad : boolean = false;
  isDelete : boolean = false;
  isOpen : boolean = false;

  @Input({required : true}) data! : MarketplaceConnectionModel;
  @Output() deleted : EventEmitter<number> = new EventEmitter();

  constructor(private dialog: Dialog, private connectionService : SellerOpenApiConnectionsService, private marketplaceConnectionService : MarketplaceConnectionsService){}

  openRefreshTokenModal(){
    const modal = this.dialog.open(RefreshTokenModalComponent);
    if(modal.componentInstance){
      modal.componentInstance.data = this.data;
    }
    else{
      modal.close();
    }
  }

  delete(){
    this.isLoad = true;
    this.isDelete = true;

    this.marketplaceConnectionService.delete(this.data.id)
      .pipe(
        finalize(() => {
          this.isDelete = false;
          this.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          this.deleted.emit(this.data.id);
        }
      })
  }
}
