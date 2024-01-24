import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RatingModel } from '../../models/rating.model';
import { ProgressBarComponent } from "../../../../../../../shared/components/progress-bar/progress-bar.component";
import { RatingsService } from '../../services/ratings.service';
import { ViewMappingService } from '../../../../../../../core/services/view-mapping.service';
import { ViewResult } from '../../../../../../../core/models/view-result.model';
import { finalize, map } from 'rxjs';
import { SpinerComponent } from "../../../../../../../shared/components/spiner/spiner.component";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
    selector: 'app-ratings',
    standalone: true,
    templateUrl: './ratings.component.html',
    styleUrl: './ratings.component.scss',
    imports: [CommonModule, ProgressBarComponent, SpinerComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class RatingsComponent{

  private _connectionId! : number;

  ratings : ViewResult<RatingModel>[] | null = null;

  @Input({required : true}) 
   set connectionId(value : number){
    this._connectionId = value;
    this.getRange(value);
   }

  constructor(private ratingsService : RatingsService, private mapping : ViewMappingService){}

  add(connectionId : number, rating : number){
    if(this.ratings != null){
      const viewRating = this.mapping.map({rating : rating, templates : []})
      viewRating.actions.isLoad = true;
      this.ratings = this.ratings.concat(viewRating)

      this.ratingsService.add(rating, connectionId)
        .subscribe({
          complete : ()=> {
            viewRating.actions.isLoad = false;
          },
          error : () => {
            if(this.ratings != null){
              this.ratings = this.ratings.filter(x=> x != viewRating);
            }
          }
        })
    }
  }

  delete(rating : ViewResult<RatingModel>){
    const requestConenctionId = this._connectionId;
    rating.actions.isLoad = true;

    this.ratingsService.delete(rating.data.rating, requestConenctionId)
      .pipe(
        finalize(() => {
          rating.actions.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          if(requestConenctionId == this._connectionId && this.ratings != null){
            this.ratings = this.ratings.filter(x=> x != rating);
          }
        }
      })
  }

  getRange(connectionId : number){
    this.ratings = null;
    this.ratingsService.getRatings(connectionId)
      .pipe(
        map(x=> x.map(item => this.mapping.map(item)))
      )
      .subscribe({
        next : data => {
          if(connectionId == this._connectionId){
            this.ratings = data;
          }
        }
      })
  }
}
