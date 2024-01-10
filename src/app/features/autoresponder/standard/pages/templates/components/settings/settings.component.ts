import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SettingsModel, SettingsUpdateModel } from './models/settings.model';
import { SettingsService } from './services/settings.service';
import { finalize } from 'rxjs';
import { SpinerComponent } from "../../../../../../../shared/components/spiner/spiner.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, MatTooltipModule, SpinerComponent, FormsModule]
})
export class SettingsComponent implements OnInit {
  
  @Input({required : true}) templateId!: number;
  viewSettings : SettingsModel | null = null;
  setting : SettingsModel | null = null;
  isLoad : boolean = true;

  constructor(private settingsService : SettingsService){};

  ngOnInit(): void {
    this.get();
  }

  update(){

    if(this.viewSettings == null){
      return;
    }

    const updateSettings : SettingsUpdateModel = { ...this.viewSettings, templateId : this.templateId};

    this.isLoad = true;

    this.settingsService.update(updateSettings)
      .pipe(
        finalize(() => {
          this.isLoad = false;
      }))
      .subscribe({
        complete : () => {
          this.setting = this.viewSettings;
        },
        error : data => {
          this.viewSettings = this.setting;
        }
      })
  }

  get(){
    this.isLoad = true;

    this.settingsService.get(this.templateId)
      .pipe(
        finalize(() => {
          this.isLoad = false;
      }))
      .subscribe({
        next : data => {
          this.viewSettings = data;
          this.setting = data;
        }
      })
  }
}
