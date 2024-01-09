import { Pipe, PipeTransform } from '@angular/core';
import { NameModel } from './models/name.model';
import { ViewResult } from '../../core/models/view-result.model';
import { Template } from '../../features/autoresponder/standard/pages/templates/models/template';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform(items: ViewResult<Template>[], searchText: string): ViewResult<Template>[] {
    if (!items) return items;
    if (!searchText) return items;
    if (searchText == "") return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => item.data.name.toLowerCase().includes(searchText));
  }

}
