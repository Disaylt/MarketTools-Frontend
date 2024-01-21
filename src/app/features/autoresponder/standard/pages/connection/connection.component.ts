import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewMappingService } from '../../../../../core/services/view-mapping.service';
import { TemplateService } from '../templates/services/template.service';
import { Template } from '../templates/models/template';
import { finalize } from 'rxjs';
import { NameFilterPipe } from "../../../../../shared/pipes/name-filter.pipe";
import { TemplateFilterPipe } from "../../../../../shared/pipes/template-filter.pipe";

@Component({
    selector: 'app-connection',
    standalone: true,
    templateUrl: './connection.component.html',
    styleUrl: './connection.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, FormsModule, NameFilterPipe, TemplateFilterPipe]
})
export class ConnectionComponent {

  searchTemplateValue : string = "";
  isLoad : boolean = true;
  selectTemplate : Template | null = null;
  templates : Template[] = [];

  @ViewChild(CdkMenu) cdkMenu!: CdkMenu;
  
  constructor(private mapper : ViewMappingService, private templateService : TemplateService){}

  ngOnInit(): void {
    this.getRange();
  }
  
  select(template : Template){
    this.cdkMenu.menuStack.closeAll();
    this.selectTemplate = template;
  }

  getRange(){
    this.isLoad = true;
    this.templates = [];

    this.templateService.getRange()
      .pipe(
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
