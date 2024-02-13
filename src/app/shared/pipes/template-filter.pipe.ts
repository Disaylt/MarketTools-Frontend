import { Pipe, PipeTransform } from '@angular/core';
import { Template } from '../../features/autoresponder/standard/pages/templates/models/template';

@Pipe({
  name: 'templateFilter',
  standalone: true
})
export class TemplateFilterPipe implements PipeTransform {

  transform(items: Template[], searchText: string): Template[] {
    if (!items) return items;
    if (!searchText) return items;
    if (searchText == "") return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => item.name.toLowerCase().includes(searchText));
  }

}
