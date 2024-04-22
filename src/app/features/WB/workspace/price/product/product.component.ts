import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../models/product-view.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({required: true}) product! : ProductViewModel;
}
