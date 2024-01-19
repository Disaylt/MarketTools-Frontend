import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/modal/modal.component";
import { NewOpenApiConnectionBody } from '../../models/seller-open-api.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerOpenApiConnectionsService } from '../../services/seller-open-api-connections.service';
import { finalize } from 'rxjs';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-new-connection-modal',
    standalone: true,
    templateUrl: './new-connection-modal.component.html',
    styleUrl: './new-connection-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent]
})
export class NewConnectionModalComponent {

  isLoad : boolean = false;
  newConnection : NewOpenApiConnectionBody = {
    name : "",
    description : "",
    token : ""
  }

  constructor(public dialogRef: DialogRef<any>, private openApiConnectionService : SellerOpenApiConnectionsService){}

  add(){
    this.isLoad = true;

    this.openApiConnectionService.add(this.newConnection)
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
