import { Component, Input } from '@angular/core';
import { MarketplaceConnectionModel } from '../../models/marketplace-connection.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MarketplaceConnectionsService } from '../../services/marketplace-connections.service';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from "../../../../shared/components/spiner/spiner.component";
import { finalize } from 'rxjs';

@Component({
    selector: 'app-update-description-modal',
    standalone: true,
    templateUrl: './update-description-modal.component.html',
    styleUrl: './update-description-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent]
})
export class UpdateDescriptionModalComponent {

  isLoad : boolean = false;
  description : string = "";
  @Input({required : true}) data! : MarketplaceConnectionModel;
  
  constructor(public dialogRef: DialogRef<any>, private marketplaceConnectionsService : MarketplaceConnectionsService){}

  update(){
    this.isLoad = true;

    this.marketplaceConnectionsService.updateDescription({id : this.data.id, description : this.description})
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          this.data.description = this.description;
          this.dialogRef.close();
        }
      })
  }
}
