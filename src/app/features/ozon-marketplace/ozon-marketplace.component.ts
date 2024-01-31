import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketDeterminantService } from '../../core/services/market-determinant.service';
import { MarketplaceName } from '../../core/enums/marketplace-name';
import { MarketplaceStorage } from '../../core/constants/navigations/marketpkaces.storage';

@Component({
  selector: 'app-ozon-marketplace',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ozon-marketplace.component.html',
  styleUrl: './ozon-marketplace.component.scss'
})
export class OzonMarketplaceComponent {
  constructor(marketplaceDetemint : MarketDeterminantService){
    marketplaceDetemint.marketplace = MarketplaceStorage.value.find(x=> x.nameEnum == MarketplaceName.ozon)!;
  }
}
