import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from '../../../../../../shared/components/spiner/spiner.component';
import { NewOzonSellerAccountConnectionModel } from '../../models/new-connection.model';
import { ConnectionsService } from '../../services/connections.service';
import { DialogRef } from '@angular/cdk/dialog';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-new-connection-modal',
    standalone: true,
    templateUrl: './new-connection-modal.component.html',
    styleUrl: './new-connection-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent]
})
export class NewConnectionModalComponent {

  isLoad : boolean = false;
  newConnection : NewOzonSellerAccountConnectionModel;

  constructor(public dialogRef: DialogRef<any>, private connectionService : ConnectionsService){
    this.newConnection = {
      name : "",
      description : "",
      refreshToken : "",
      sellerId : ""
    }
  }

  add(){
    this.isLoad = true;

    this.connectionService.create(this.newConnection)
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
