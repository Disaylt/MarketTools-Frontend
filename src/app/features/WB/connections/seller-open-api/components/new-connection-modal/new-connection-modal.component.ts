import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../../shared/components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";
import { NewOpenApiConnectionBody } from '../../../../../marketplace-connections/models/open-api.models';
import { OpenApiService } from '../../../../../marketplace-connections/services/open-api.service';
import { MarketDeterminantService } from '../../../../../../core/services/market-determinant.service';
import { MarketplaceName } from '../../../../../../core/enums/marketplace-name';

@Component({
    selector: 'app-new-connection-modal',
    standalone: true,
    templateUrl: './new-connection-modal.component.html',
    styleUrl: './new-connection-modal.component.scss',
    imports: [ModalComponent, CommonModule, FormsModule, SpinerComponent]
})
export class NewConnectionModalComponent {

  isLoad : boolean = false;
  newConnection : NewOpenApiConnectionBody;

  constructor(public dialogRef: DialogRef<any>, 
    private openApiConnectionService : OpenApiService)
  {
    this.newConnection = {
      name : "",
      description : "",
      token : "",
      marketplaceName : MarketplaceName.wb
    }
  }

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
