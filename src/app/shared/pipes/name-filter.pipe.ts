import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform<T extends {name : string}>(items: T[], searchText: string): T[] {
    if (!items) return items;
    if (!searchText) return items;
    if (searchText == "") return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => item.name.toLowerCase().includes(searchText));
  }

}
