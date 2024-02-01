import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-bar.component.html',
  styleUrl: './rating-bar.component.scss'
})
export class RatingBarComponent {
  @Input() maxRate : number = 5;
}
