import { Component, Input } from '@angular/core';
import { BaseConnectionV2 } from '../../models/marketplace-connections-v2.models';
import { MarketplaceConnectionV2Service } from '../../services/marketplace-connection-v2.service';
import { DialogRef } from '@angular/cdk/dialog';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from "../../../../shared/components/spiner/spiner.component";
import { ModalComponent } from "../../../../shared/components/modal/modal.component";

@Component({
    selector: 'app-new-description-modal-v2',
    standalone: true,
    templateUrl: './new-description-modal-v2.component.html',
    styleUrl: './new-description-modal-v2.component.scss',
    imports: [CommonModule, FormsModule, SpinerComponent, ModalComponent]
})
export class NewDescriptionModalV2Component {
  
  isLoad : boolean = false;
  description : string = "";
  @Input({required : true}) data! : BaseConnectionV2;
  
  constructor(public dialogRef: DialogRef<any>, private marketplaceConnectionsService : MarketplaceConnectionV2Service){}

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
          this.dialogRef.close(this.description);
        }
      })
  }
}
