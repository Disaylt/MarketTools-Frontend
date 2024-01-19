import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-connection-modal',
  standalone: true,
  imports: [],
  templateUrl: './new-connection-modal.component.html',
  styleUrl: './new-connection-modal.component.scss'
})
export class NewConnectionModalComponent {

  constructor(public dialogRef: DialogRef<any>){}
}
