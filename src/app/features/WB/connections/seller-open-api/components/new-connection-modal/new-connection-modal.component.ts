import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import { MarketDeterminantService } from '../../../../../../core/services/market-determinant.service';
import { MarketplaceName } from '../../../../../../core/enums/marketplace-name';
import { WbSellerApiConnectionService } from '../../services/connection.service';
import { NewWbSellerApiConnectionModel } from '../../models/new-connection.model';

@Component({
    selector: 'app-new-connection-modal',
    standalone: true,
    templateUrl: './new-connection-modal.component.html',
    styleUrl: './new-connection-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent]
})
export class NewConnectionModalComponent {

  isLoad : boolean = false;
  newConnection : NewWbSellerApiConnectionModel;

  constructor(public dialogRef: DialogRef<any>, 
    private openApiConnectionService : WbSellerApiConnectionService)
  {
    this.newConnection = {
      name : "",
      description : "",
      token : ""
    }
  }

  add(){
    this.isLoad = true;

    this.openApiConnectionService.create(this.newConnection)
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe(
        {
          next : data => {
            this.dialogRef.close(data);
          }
        }
      )
  }
}
