import { Pipe, PipeTransform } from '@angular/core';
import { NameModel } from './models/name.model';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform(items: any[], property: string, searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    return items.filter(item => item[property].toLowerCase().includes(searchText.toLowerCase()));
  }

}
