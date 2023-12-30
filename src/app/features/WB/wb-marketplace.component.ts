import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketDeterminantService } from '../../core/services/market-determinant.service';
import { MarketplaceName } from '../../core/enums/marketplace-name';
import { MarketplaceStorage } from '../../core/constants/navigations/marketpkaces.storage';

@Component({
  selector: 'app-wb-marketplace',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './wb-marketplace.component.html',
  styleUrl: './wb-marketplace.component.scss'
})
export class WbMarketplaceComponent {

  constructor(marketplaceDetemint : MarketDeterminantService){
    marketplaceDetemint.marketplace = MarketplaceStorage.value[MarketplaceName.wb];
  }
}
