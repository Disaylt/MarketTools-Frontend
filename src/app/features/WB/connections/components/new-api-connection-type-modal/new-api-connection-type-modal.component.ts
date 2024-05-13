import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(public dialogRef: DialogRef<any>){}

  refresh(){

  }
}
