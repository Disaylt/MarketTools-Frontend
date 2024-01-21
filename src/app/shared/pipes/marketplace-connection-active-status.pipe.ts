import { Pipe, PipeTransform } from '@angular/core';
import { MarketplaceConnectionModel } from '../../features/marketplace-connections/models/marketplace-connection.model';
import { ActiveFilter } from './models/active-filter.model';

@Pipe({
  name: 'marketplaceConnectionActiveStatus',
  standalone: true
})
export class MarketplaceConnectionActiveStatusPipe implements PipeTransform {

  transform(items: MarketplaceConnectionModel[], filter: ActiveFilter): MarketplaceConnectionModel[] {
    if (!items) return items;
    
    return items.filter(x=> x.isActive == filter.isShowActive || !x.isActive == filter.isShowInactive)
  }

}
