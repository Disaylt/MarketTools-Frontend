import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinerComponent } from '../../../../shared/components/spiner/spiner.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ActiveStatusInfoComponent } from '../../../../shared/components/active-status-info/active-status-info.component';
import { Dialog } from '@angular/cdk/dialog';
import { MarketplaceConnectionModel } from '../../models/marketplace-connection.model';
import { MarketplaceConnectionsService } from '../../services/marketplace-connections.service';
import { UpdateDescriptionModalComponent } from '../update-description-modal/update-description-modal.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [SpinerComponent, CdkAccordionModule, CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, ActiveStatusInfoComponent],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent {
  isLoad : boolean = false;
  isDelete : boolean = false;
  isOpen : boolean = false;

  @Input({required : true}) data! : MarketplaceConnectionModel;
  @Output() deleted : EventEmitter<number> = new EventEmitter();
  @Output() changedData : EventEmitter<MarketplaceConnectionModel> = new EventEmitter();

  constructor(private dialog: Dialog,
    private marketplaceConnectionService : MarketplaceConnectionsService){}

    openChangeDataModal(){
      this.changedData.emit(this.data);
    }

  // openRefreshTokenModal(){
  //   const modal = this.dialog.open(RefreshTokenModalComponent);
  //   if(modal.componentInstance){
  //     modal.componentInstance.data = this.data;
  //   }
  //   else{
  //     modal.close();
  //   }
  // }

  openUpdateDescriptionModal(){
    const modal = this.dialog.open(UpdateDescriptionModalComponent);
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
