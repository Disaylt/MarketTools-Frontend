import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../../../../../../../shared/components/modal/modal.component";
import { DialogRef } from '@angular/cdk/dialog';
import { TemplateService } from '../../../templates/services/template.service';
import { Template } from '../../../templates/models/template';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../../../../../../shared/components/progress-bar/progress-bar.component";
import { NameFilterPipe } from "../../../../../../../shared/pipes/name-filter.pipe";
import { FormsModule } from '@angular/forms';
import { RatingsService } from '../../services/ratings.service';

@Component({
    selector: 'app-templates',
    standalone: true,
    templateUrl: './templates.component.html',
    styleUrl: './templates.component.scss',
    imports: [ModalComponent, CommonModule, ProgressBarComponent, NameFilterPipe, FormsModule]
})
export class TemplatesComponent implements OnInit{

  useTemplates : Template[] = [];
  availableTemplates : Template[] = [];
  isLoad : boolean = true;
  searchSellerValue : string = "";
  connectionId! : number;
  rating! : number;

  constructor(public dialogRef : DialogRef, private templatesService : TemplateService, private ratingsService : RatingsService){}

  add(template : Template){
    const length = this.useTemplates.push(template);
    this.availableTemplates = this.availableTemplates.filter(x=> x != template);

    this.ratingsService.addTemplate(this.rating, this.connectionId, template.id)
      .subscribe({
        error : (error) => {
          this.useTemplates = this.useTemplates.splice(length - 1, 1);
        }
      })
  }

  ngOnInit(): void {
    this.isLoad = true;
    this.templatesService.getRange()
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.availableTemplates = data.filter(template=> !this.useTemplates.some(useTemplate => useTemplate.id == template.id))
        }
      })
  }
}
