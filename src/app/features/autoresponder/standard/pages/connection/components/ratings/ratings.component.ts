import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { RatingModel } from '../../models/rating.model';
import { ProgressBarComponent } from "../../../../../../../shared/components/progress-bar/progress-bar.component";
import { RatingsService } from '../../services/ratings.service';

@Component({
    selector: 'app-ratings',
    standalone: true,
    templateUrl: './ratings.component.html',
    styleUrl: './ratings.component.scss',
    imports: [CommonModule, ProgressBarComponent]
})
export class RatingsComponent{

  private _connectionId! : number;

  @Input() ratings : RatingModel[] | null = null;

  @Input({required : true}) 
   set connectionId(value : number){
    this._connectionId = value;
    this.getRange();
   }

  constructor(private ratingsService : RatingsService){}

  getRange(){
    this.ratings = null;
    this.ratingsService.getRatings(this._connectionId)
      .subscribe({
        next : data => {
          this.ratings = data;
          console.log(this.ratings);
        }
      })
  }
}
