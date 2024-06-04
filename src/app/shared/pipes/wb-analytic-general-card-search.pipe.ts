import { Pipe, PipeTransform } from '@angular/core';
import { CardModel } from '../../features/WB/analytic/general/cards/models/card.model';

@Pipe({
  name: 'wbAnalyticGeneralCardSearch',
  standalone: true
})
export class WbAnalyticGeneralCardSearchPipe implements PipeTransform {

  transform(value: CardModel[], searchText: string): CardModel[] {
    if (searchText == "") return value;

    searchText = searchText.toLowerCase();

    return value.filter(item => item.article.toString().includes(searchText) 
    || item.vendorCode.toLowerCase().includes(searchText)
    || item.name.toLowerCase().includes(searchText)
    || item.title.toLowerCase().includes(searchText)
    || item.brand.toLowerCase().includes(searchText))
  }

}
