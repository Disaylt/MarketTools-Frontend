import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { WindowsSizes } from '../../constants/window-sizes';
import { IconButtonComponent } from "../../../shared/components/buttons/icon-button/icon-button.component";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { UserMenuComponent } from "./user-menu/user-menu.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [MatIconModule, CommonModule, IconButtonComponent, CdkMenuTrigger, CdkMenu, CdkMenuItem, UserMenuComponent]
})
export class HeaderComponent {
  @Output() toggleEvent = new EventEmitter<void>();

  toggleClick(){
    this.toggleEvent.emit();
  }

}
