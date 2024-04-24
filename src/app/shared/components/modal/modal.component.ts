import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input({required: true}) dialogRef! : DialogRef<any>;
  @Input() name : string = "Окно";
  @Input() minWidth : string = "300px"
  @Input() maxWidth : string = "none"
  @Input() minHeight : string = "auto"
  @Input() maxHeight : string = "90vh"
}
