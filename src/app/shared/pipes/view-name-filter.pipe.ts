import { Pipe, PipeTransform } from '@angular/core';
import { ViewResult } from '../../core/models/view-result.model';

@Pipe({
  name: 'viewNameFilter',
  standalone: true
})
export class ViewNameFilterPipe implements PipeTransform {

  transform<T extends ViewResult<{name : string}>>(items: T[], searchText: string): T[] {
    if (!items) return items;
    if (!searchText) return items;
    if (searchText == "") return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => item.data.name.toLowerCase().includes(searchText));
  }

}
