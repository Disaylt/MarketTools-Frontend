import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input({required: true}) dialogRef! : DialogRef<any>;
  @Input() name : string = "Окно";
}
