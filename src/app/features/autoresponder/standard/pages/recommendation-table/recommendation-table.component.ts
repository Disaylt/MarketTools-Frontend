import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MarketDeterminantService } from '../../../../../core/services/market-determinant.service';
import { MarketplaceStorage } from '../../../../../core/constants/navigations/marketpkaces.storage';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommendation-table',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule],
  providers : [],
  templateUrl: './recommendation-table.component.html',
  styleUrl: './recommendation-table.component.scss'
})
export class RecommendationTableComponent {

  searchArticle : string = "";

  constructor(private marketDeterminantService : MarketDeterminantService){

  }
}
