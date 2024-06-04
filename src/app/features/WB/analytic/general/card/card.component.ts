import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    imports: [ModalComponent]
})
export class CardComponent {

  constructor(public dialogRef: DialogRef<any>){}
}
