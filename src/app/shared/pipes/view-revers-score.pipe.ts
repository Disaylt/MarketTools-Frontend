import { Pipe, PipeTransform } from '@angular/core';
import { ViewResult } from '../../core/models/view-result.model';

@Pipe({
  name: 'viewReversScore',
  standalone: true
})
export class ViewReversScorePipe implements PipeTransform {

  transform<T extends ViewResult<{rating : number}>>(items: number[], ratings: T[]): number[] {
    if (!items) return items;

    return items.filter(item => ratings.some(x=> x.data.rating == item) == false);
  }

}
