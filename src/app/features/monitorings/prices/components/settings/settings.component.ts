import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { SpinerComponent } from '../../../../../shared/components/spiner/spiner.component';
import { SettingsModel, SettingsUpdateModel } from '../../models/settings.model';
import { finalize } from 'rxjs';
import { ConnectionsService } from '../../services/connections.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem, CommonModule, MatTooltipModule, SpinerComponent, FormsModule, ProgressBarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  @Input({required : true}) connectionId! : number;
  isLoad : boolean = true;
  settings : SettingsModel | null = null;
  viewSettings : SettingsModel | null = null;

  constructor(private connectionSerivce : ConnectionsService){}

  async ngOnInit() {
    await this.loadAsync();
  }

  update(){

    if(this.viewSettings == null){
      return;
    }

    const updateSettings : SettingsUpdateModel = { ...this.viewSettings, id : this.connectionId};

    this.isLoad = true;

    this.connectionSerivce.updateSettings(updateSettings)
      .pipe(
        finalize(() => {
          this.isLoad = false;
      }))
      .subscribe({
        error : data => {
          this.viewSettings = this.settings;
        }
      })
  }

  private loadAsync(){
    this.isLoad = true;

    this.connectionSerivce.getSettings(this.connectionId)
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : data => {
          this.settings = data;
          this.viewSettings = data;
        }
      })
  }

}
