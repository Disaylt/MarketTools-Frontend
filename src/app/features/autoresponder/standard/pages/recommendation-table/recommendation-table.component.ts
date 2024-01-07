import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { MarketDeterminantService } from '../../../../../core/services/market-determinant.service';
import { MarketplaceStorage } from '../../../../../core/constants/navigations/marketpkaces.storage';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { ViewResult } from '../../../../../core/models/view-result.model';
import { RecommendationProduct } from './models/recommendation-product.model';
import { RecomendationProductsService } from './services/recomendation-products.service';
import { PaginationBarComponent } from "../../../../../shared/components/pagination-bar/pagination-bar.component";
import { Observable, concat, concatMap, finalize, map, of } from 'rxjs';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { RecommendationProductComponent } from "./components/recommendation-product/recommendation-product.component";
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { FileUploaderModalComponent } from '../../../../../core/components/file-uploader-modal/file-uploader-modal.component';
import { FileType } from '../../../../../core/enums/file-types';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesUtility } from '../../../../../shared/utilities/FilesUtility';
import { ExcelComponent } from "./components/excel/excel.component";

@Component({
    selector: 'app-recommendation-table',
    standalone: true,
    providers: [],
    templateUrl: './recommendation-table.component.html',
    styleUrl: './recommendation-table.component.scss',
    imports: [DialogModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ProgressBarComponent, PaginationBarComponent, RecommendationProductComponent, SpinerComponent, ExcelComponent]
})
export class RecommendationTableComponent implements OnInit{

  reloadTableEvent : EventEmitter<void> = new EventEmitter<void>();
  loadStatusEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
  searchArticle : string = "";
  @ViewChild(PaginationBarComponent) paginationBar! : PaginationBarComponent;


  isLoad = true;
  recommendationProducts : ViewResult<RecommendationProduct>[] = [];

  constructor(private recommendationProductsService : RecomendationProductsService, 
    private router : Router, 
    private activeRoute : ActivatedRoute,
    private mapper : ViewMappingService){
  }

  ngOnInit(): void {
    const article = this.activeRoute
      .snapshot
      .queryParams["article"];

    if(article as string){
      this.searchArticle = article;
    }

    this.reloadTableEvent.subscribe(x=> {
      this.get();
    });

    this.loadStatusEvent.subscribe(x=> {
      this.isLoad = x;
    })
  }

  ngAfterViewInit(){
    this.paginationBar.onChangePage.subscribe(
      (data) => {
        this.get()
      }
    )
    this.get();
  }

  add(){
    const newValue : RecommendationProduct = {
      id : 0,
      feedbackArticle : "",
      feedbackProductName : null,
      recommendationArticle : null,
      recommendationProductName : null
    }
    const viewValue = this.mapper.map<RecommendationProduct>(newValue);
    viewValue.actions.isEdit = true;

    this.recommendationProducts.unshift(viewValue);
  }

  delete(value : ViewResult<RecommendationProduct>){

    if(value.data.id === 0){
      this.recommendationProducts.filter(x=> x != value);
      return;
    }

    value.actions.isLoad = true;

    this.recommendationProductsService.delete(value.data.id)
      .pipe(
        finalize(() => {
          value.actions.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          this.recommendationProducts = this.recommendationProducts.filter(x=> x != value);
        }
      })
  }

  save(value : ViewResult<RecommendationProduct>){
    value.actions.isLoad = true;

    let action : Observable<any>;

    if(value.data.id === 0){
      action = this.recommendationProductsService.add(value.data)
    }
    else{
      action = this.recommendationProductsService.update(value.data);
    }

    action.pipe(
      map(data => data as RecommendationProduct),
      finalize(() => {
        value.actions.isLoad = false;
      })
    )
    .subscribe({
      next: (data) => {

        if(data != null){
          value.data.id = data.id;
        }

        value.actions.isEdit = false;
      }
    })
  }


  changeSearchArticle(){
    const queryParams = {"article" : this.searchArticle}
    this.router.navigate([],{queryParams: queryParams, queryParamsHandling : "merge"})
    this.get();
  }

  get(){
    this.isLoad = true;
    const requestPage = this.paginationBar.page;
    const requestArticle = this.searchArticle;

    this.recommendationProductsService.get(
      this.searchArticle, 
      this.paginationBar.paginationDetails.take,
      this.paginationBar.paginationDetails.skip)
      .pipe(
        finalize(() => {
          if(requestPage === this.paginationBar.page && requestArticle === this.searchArticle){
            this.isLoad = false;
          }
        })
      )
      .subscribe(
        {
          next : (data) => {
            if(requestPage === this.paginationBar.page && requestArticle === this.searchArticle){
              this.paginationBar.updateTotal(data.total);

              this.recommendationProducts = data.items
                .map(x=> this.mapper.map(x));
            }
          }
        }
      )
  }
}
