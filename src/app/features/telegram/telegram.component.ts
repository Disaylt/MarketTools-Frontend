import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketDeterminantService } from '../../core/services/market-determinant.service';
import { MarketplaceName } from '../../core/enums/marketplace-name';
import { MarketplaceStorage } from '../../core/constants/navigations/marketpkaces.storage';

@Component({
  selector: 'app-telegram',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './telegram.component.html',
  styleUrl: './telegram.component.scss'
})
export class TelegramComponent {
  constructor(marketplaceDetemint : MarketDeterminantService){
    const value = MarketplaceStorage.value.find(x=> x.nameEnum == MarketplaceName.telegram)!;
    marketplaceDetemint.set(value);
  }
}
