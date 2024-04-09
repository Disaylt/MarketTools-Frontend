import { Component, Input } from '@angular/core';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { ConnectionsService } from '../../services/connections.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarketplaceConnectionModel } from '../../../../../marketplace-connections/models/marketplace-connection.model';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-update-modal',
    standalone: true,
    templateUrl: './update-modal.component.html',
    styleUrl: './update-modal.component.scss',
    imports: [SpinerComponent, ModalComponent, FormsModule, CommonModule]
})
export class UpdateModalComponent {

  isLoad : boolean = false;
  token : string = "";

  @Input({required : true}) data! : MarketplaceConnectionModel;

  public constructor(public dialogRef: DialogRef<any>, private connectionSerivce : ConnectionsService){}

  refresh(){
    this.isLoad = true;

    this.connectionSerivce.updateToken({connectionId : this.data.id, token : this.token})
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
