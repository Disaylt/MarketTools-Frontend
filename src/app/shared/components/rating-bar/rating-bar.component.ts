import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-bar.component.html',
  styleUrl: './rating-bar.component.scss'
})
export class RatingBarComponent implements OnInit{

  @Output() changeRating : EventEmitter<number> = new EventEmitter();
  @Input() selectRate : number = 0;
  @Input() maxRate : number = 5;

  hoverRate : number = 0;
  rates : number[] = []

  ngOnInit(): void {
    this.setRates(); 
  }

  change(rate : number){
    this.changeRating.emit(rate);
  }

  isActive(rate : number){
    return rate <= this.selectRate;
  }

  isHover(rate : number){
    return rate <= this.hoverRate;
  }

  private setRates(){
    for(let rate =1 ; rate <= this.maxRate; rate ++){
      this.rates.push(rate);
    }
  }
}
