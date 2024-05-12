import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-active-status-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './active-status-info.component.html',
  styleUrl: './active-status-info.component.scss'
})
export class ActiveStatusInfoComponent {
  @Input({required : true}) isActive! : boolean;
  @Input() isPointer : boolean = false;
  @Input() activeText : string = "Активен"
  @Input() inactiveText : string = "Неактивен"
}
