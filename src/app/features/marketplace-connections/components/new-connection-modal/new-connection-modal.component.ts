import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { SpinerComponent } from '../../../../shared/components/spiner/spiner.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MarketplaceConnectionV2Service } from '../../services/marketplace-connection-v2.service';
import { BaseConnectionV2, NewSellecrConnection } from '../../models/marketplace-connections-v2.models';
import { MarketDeterminantService } from '../../../../core/services/market-determinant.service';
import { finalize } from 'rxjs';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';

@Component({
  selector: 'app-new-connection-modal',
  standalone: true,
  imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent, CdkMenu, CdkMenuItem],
  templateUrl: './new-connection-modal.component.html',
  styleUrl: './new-connection-modal.component.scss'
})
export class NewConnectionModalComponent {

  isLoad : boolean = false;
  value : NewSellecrConnection;
  @Output() created : EventEmitter<BaseConnectionV2> = new EventEmitter<BaseConnectionV2>();
  
  constructor(private connectionsService : MarketplaceConnectionV2Service, determinantService : MarketDeterminantService){
    this.value = {
      name : "",
      description : "",
      marketplace : determinantService.getRequired().nameEnum
    }
  }

  create(){
    this.isLoad = true;
    this.connectionsService
      .create(this.value)
      .pipe(finalize(() => {
        this.isLoad = false
      }))
      .subscribe({
        next: data => {
          this.value.name = "";
          this.value.description = "";
          this.created.emit(data);
        }
      })
  }
}
