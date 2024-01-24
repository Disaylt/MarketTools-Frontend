import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversScore',
  standalone: true
})
export class ReversScorePipe implements PipeTransform {

  transform<T extends {rating : number}>(items: number[], ratings: T[]): number[] {
    if (!items) return items;

    return items.filter(item => ratings.some(x=> x.rating == item) == false);
  }


}
