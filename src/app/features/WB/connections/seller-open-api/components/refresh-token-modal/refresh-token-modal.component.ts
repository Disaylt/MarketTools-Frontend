import { Component, Input } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { MarketplaceConnectionsService } from '../../../../../marketplace-connections/services/marketplace-connections.service';
import { SellerOpenApiConnectionsService } from '../../services/seller-open-api-connections.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MarketplaceConnectionModel } from '../../../../../marketplace-connections/models/marketplace-connection.model';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-refresh-token-modal',
    standalone: true,
    templateUrl: './refresh-token-modal.component.html',
    styleUrl: './refresh-token-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent]
})
export class RefreshTokenModalComponent {

  isLoad : boolean = false;
  token : string = "";
  
  @Input({required : true}) data! : MarketplaceConnectionModel;
  
  constructor(public dialogRef: DialogRef<any>, private openApiConnectionService : SellerOpenApiConnectionsService){}

  refresh(){
    this.isLoad = true;

    this.openApiConnectionService.refreshToken({id : this.data.id, token : this.token})
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.data.isActive = data.isActive;
        },
        complete : () => {
          this.dialogRef.close();
        }
      })
  }
}
