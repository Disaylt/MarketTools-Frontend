import { Pipe, PipeTransform } from '@angular/core';
import { NameModel } from './models/name.model';
import { ViewResult } from '../../core/models/view-result.model';
import { Template } from '../../features/autoresponder/standard/pages/templates/models/template';

@Pipe({
  name: 'viewTemplateFilter',
  standalone: true
})
export class ViewTemplateFilterPipe implements PipeTransform {

  transform(items: ViewResult<Template>[], searchText: string): ViewResult<Template>[] {
    if (!items) return items;
    if (!searchText) return items;
    if (searchText == "") return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => item.data.name.toLowerCase().includes(searchText));
  }

}
