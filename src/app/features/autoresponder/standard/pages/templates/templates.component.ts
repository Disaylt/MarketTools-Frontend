import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewResult } from '../../../../../core/models/view-result.model';
import { NewTemplate, Template } from './models/template';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { TemplateService } from './services/template.service';
import { finalize, map } from 'rxjs';
import { ProgressBarComponent } from "../../../../../shared/components/progress-bar/progress-bar.component";
import { SpinerComponent } from "../../../../../shared/components/spiner/spiner.component";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { NameFilterPipe } from "../../../../../shared/pipes/name-filter.pipe";
import { SettingsComponent } from "./components/settings/settings.component";
import { BlackListComponent } from "./components/black-list/black-list.component";
import { ArticlesComponent } from "./components/articles/articles.component";
import { BindPositionsComponent } from "./components/bind-positions/bind-positions.component";
import { TabBarComponent } from "../../../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";

@Component({
    selector: 'app-templates',
    standalone: true,
    templateUrl: './templates.component.html',
    styleUrl: './templates.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, ProgressBarComponent, SpinerComponent, NameFilterPipe, SettingsComponent, BlackListComponent, ArticlesComponent, BindPositionsComponent, TabBarComponent, TabBarButtonComponent]
})
export class TemplatesComponent implements OnInit {
  selectTemplate : ViewResult<Template> | null = null;
  templates : ViewResult<Template>[] = [];
  isLoad : boolean = true;

  searchTemplateValue : string = "";

  newTemplate = {
    name : "",
    isLoad : false
  }
  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;

  constructor(private mapper : ViewMappingService, private templateService : TemplateService){}

  ngOnInit(): void {
    this.getRange();
  }
  
  select(template : ViewResult<Template>){
    this.cdkMenu.menuStack.closeAll();
    this.selectTemplate = template;
  }

  delete(template : ViewResult<Template>){
    template.actions.isLoad = true;

    this.templateService.delete(template.data.id)
      .pipe(
        finalize(() => {
          template.actions.isLoad = false;
        })
      )
      .subscribe({
        complete : () => {
          this.selectTemplate = null;
          this.templates = this.templates.filter(x=> x != template);
        }
      })
  }

  add(){
    this.newTemplate.isLoad = true;
    const newTemplate : NewTemplate = {name : this.newTemplate.name};

    this.templateService.add(newTemplate)
      .pipe(
        map(data => this.mapper.map(data)),
        finalize(() => {
          this.newTemplate.isLoad = false;
        })
      )
      .subscribe(
        {
          next : data => {
            this.templates.push(data);
          },
          complete : () => {
            this.newTemplate.name = "";
          }
        }
      )
  }

  getRange(){
    this.isLoad = true;
    this.templates = [];

    this.templateService.getRange()
      .pipe(
        map(data => data.map(x=> this.mapper.map(x))),
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe(
        {
          next : data => {
            this.templates = data;
          }
        }
      )
  }
}
