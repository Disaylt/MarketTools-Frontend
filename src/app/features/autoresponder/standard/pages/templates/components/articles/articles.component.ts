import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from './services/articles.service';
import { SpinerComponent } from "../../../../../../../shared/components/spiner/spiner.component";
import { ViewResult } from '../../../../../../../core/models/view-result.model';
import { ArticleCreateModel, ArticleVm } from './models/article.models';
import { finalize, map } from 'rxjs';
import { ViewMappingService } from '../../../../../../../core/services/view-mapping.service';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
    selector: 'app-articles',
    standalone: true,
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, SpinerComponent]
})
export class ArticlesComponent{

  private _templateId! : number;

  newArticle = {
    value : "",
    isLoad : false
  }
  editTextArea : string = "";
  isEditMode : boolean = false;
  isLoad : boolean = true;
  articles : ViewResult<ArticleVm>[] = [];

  @Input({required : true})
    set templateId(value : number){
      this._templateId = value;
      this.isEditMode = false;
      this.getRange();
    }

  constructor(private articlesServise : ArticlesService, private mapper : ViewMappingService){}

  delete(article : ViewResult<ArticleVm>){
    article.actions.isLoad = true;

    this.articlesServise.delete(article.data.id)
      .pipe(
        finalize(() => {
          article.actions.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          this.articles = this.articles
            .filter(x=> x != article);
        }
      })
  }

  saveNewArticles(){
    this.isLoad = true;
    const newArticles : string[] = this.editTextArea
      .split("\n");
    const requestTemplateId = this._templateId;
    
    this.articlesServise.updateRange(newArticles, requestTemplateId)
      .pipe(
        map(data => data.map(value => this.mapper.map(value))),
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next: data => {
          if(this._templateId == requestTemplateId){
            this.articles = data;
          }
        },
        complete : () => {
          this.isEditMode = false;
        }
      })
  }

  changeEditMode(){
    this.isEditMode = !this.isEditMode;
    this.editTextArea = "";

    if(this.isEditMode){
      this.articles.forEach(x=> {
        this.editTextArea += `${x.data.value}\n`
      })
    }
  }

  add() {
    this.newArticle.isLoad = true;

    const body : ArticleCreateModel = {
      value : this.newArticle.value,
      templateId : this._templateId
    }

    this.articlesServise.create(body)
      .pipe(
        map(data => this.mapper.map(data)),
        finalize(() => {
          this.newArticle.isLoad = false;
        })
      )
      .subscribe(
        {
          next: data => {
            if(this._templateId == body.templateId){
              this.articles.push(data);
            }
          },
          complete : ()=> {
            this.newArticle.value = "";
          }
        }
      )
  }

  private getRange(){
    this.isLoad = true;
    this.articles = [];

    this.articlesServise.getRange(this._templateId)
      .pipe(
        map(data => data.map(value => this.mapper.map(value))),
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.articles = data;
        }
      })
  }
}
