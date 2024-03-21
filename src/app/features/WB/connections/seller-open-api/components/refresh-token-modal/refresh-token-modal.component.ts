import { Component, Input } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { MarketplaceConnectionsService } from '../../../../../marketplace-connections/services/marketplace-connections.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { MarketplaceConnectionModel } from '../../../../../marketplace-connections/models/marketplace-connection.model';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import { WbSellerApiConnectionService } from '../../services/connection.service';

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
  
  constructor(public dialogRef: DialogRef<any>, private openApiConnectionService : WbSellerApiConnectionService){}

  refresh(){
    this.isLoad = true;

    this.openApiConnectionService.updateToken({connectionId : this.data.id, token : this.token})
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
