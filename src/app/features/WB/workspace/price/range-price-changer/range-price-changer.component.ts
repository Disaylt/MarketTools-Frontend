import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-range-price-changer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './range-price-changer.component.html',
  styleUrl: './range-price-changer.component.scss'
})
export class RangePriceChangerComponent {

  subjects : string[] = ["Цены (Арт.)", "Цены (Размер)", "Скидки"]
  selectedSubject : string | null = null;

  selectSubject(subject : string){
    this.selectedSubject = subject;
  }
}
