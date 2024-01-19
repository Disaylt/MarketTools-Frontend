import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { MarketplaceConnectionsService } from '../../../../../marketplace-connections/services/marketplace-connections.service';
import { SellerOpenApiConnectionsService } from '../../services/seller-open-api-connections.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-refresh-token-modal',
    standalone: true,
    templateUrl: './refresh-token-modal.component.html',
    styleUrl: './refresh-token-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule]
})
export class RefreshTokenModalComponent {

  token : string = "";
  
  constructor(public dialogRef: DialogRef<any>, private openApiConnectionService : SellerOpenApiConnectionsService){}

}
