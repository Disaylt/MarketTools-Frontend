import { Component, Input } from '@angular/core';
import { IConnectionTypeComponent } from '../../../../../marketplace-connections/interfacces/connection-type-component';
import { MarketplaceConnectionV2Service } from '../../../../../marketplace-connections/services/marketplace-connection-v2.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectionsService } from '../../services/connections.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-new-account-type',
    standalone: true,
    templateUrl: './new-account-type.component.html',
    styleUrl: './new-account-type.component.scss',
    imports: [SpinerComponent, ModalComponent, CommonModule, FormsModule]
})
export class NewAccountTypeComponent implements IConnectionTypeComponent{

  isLoad : boolean = false;
  refreshToken : string = ""
  sellerId : string = ""

  @Input({required: true}) id! : number;
  @Input({required: true}) name : string = "Неизвестно";

  constructor(public dialogRef: DialogRef<any>, private connectionService : ConnectionsService){}

  refresh(){
    this.isLoad = true;
    this.connectionService
    .changeAaccountType({
      id : this.id,
      token : this.refreshToken,
      sellerId : this.sellerId
    })
    .pipe(finalize(() => {
      this.isLoad = false;
    }))
    .subscribe({
      next : data => {
        this.dialogRef.close(data);
      }
    })
  }
}
