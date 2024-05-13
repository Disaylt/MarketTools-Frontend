import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WbConnectionTypeService } from '../../services/wb-connection-type.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-new-api-connection-type-modal',
    standalone: true,
    templateUrl: './new-api-connection-type-modal.component.html',
    styleUrl: './new-api-connection-type-modal.component.scss',
    imports: [ModalComponent, SpinerComponent, CommonModule, FormsModule]
})
export class NewApiConnectionTypeModalComponent {

  isLoad : boolean = false;
  token : string = ""

  @Input({required: true}) id! : number;

  constructor(public dialogRef: DialogRef<any>, private connectionTypeService : WbConnectionTypeService){}

  refresh(){
    this.isLoad = true;
    this.connectionTypeService
    .updateApi({
      id : this.id,
      token : this.token
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
