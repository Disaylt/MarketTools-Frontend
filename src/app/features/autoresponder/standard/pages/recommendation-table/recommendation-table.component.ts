import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MarketDeterminantService } from '../../../../../core/services/market-determinant.service';
import { MarketplaceStorage } from '../../../../../core/constants/navigations/marketpkaces.storage';

@Component({
  selector: 'app-recommendation-table',
  standalone: true,
  imports: [],
  providers : [],
  templateUrl: './recommendation-table.component.html',
  styleUrl: './recommendation-table.component.scss'
})
export class RecommendationTableComponent {

  constructor(private marketDeterminantService : MarketDeterminantService){
    console.log(marketDeterminantService);
  }
}
