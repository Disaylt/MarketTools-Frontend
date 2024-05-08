import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { SpinerComponent } from '../../../../shared/components/spiner/spiner.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MarketplaceConnectionV2Service } from '../../services/marketplace-connection-v2.service';
import { NewSellecrConnection } from '../../models/marketplace-connections-v2.models';
import { MarketDeterminantService } from '../../../../core/services/market-determinant.service';

@Component({
  selector: 'app-new-connection-modal',
  standalone: true,
  imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent],
  templateUrl: './new-connection-modal.component.html',
  styleUrl: './new-connection-modal.component.scss'
})
export class NewConnectionModalComponent {

  isLoad : boolean = false;
  value : NewSellecrConnection;

  constructor(private connectionsService : MarketplaceConnectionV2Service, private determinantService : MarketDeterminantService){
    this.value = {
      name : "",
      description : "",
      marketplace : determinantService.getRequired().nameEnum
    }
  }
}
