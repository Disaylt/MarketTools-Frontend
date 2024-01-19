import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-status-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-status-info.component.html',
  styleUrl: './active-status-info.component.scss'
})
export class ActiveStatusInfoComponent {
  @Input({required : true}) isActive! : boolean;
}
