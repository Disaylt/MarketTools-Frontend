import { Component, Input } from '@angular/core';
import { ProductViewModel, SizeViewModel } from '../models/product-view.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss'
})
export class SizeComponent {
  @Input({required: true}) product! : ProductViewModel;
  @Input({required: true}) size! : SizeViewModel;
}
