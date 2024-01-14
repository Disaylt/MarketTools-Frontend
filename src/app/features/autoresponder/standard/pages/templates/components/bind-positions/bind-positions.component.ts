import { Component } from '@angular/core';
import { TabBarComponent } from "../../../../../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../../../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-bind-positions',
    standalone: true,
    templateUrl: './bind-positions.component.html',
    styleUrl: './bind-positions.component.scss',
    imports: [TabBarComponent, TabBarButtonComponent, CdkDropList, CdkDrag, CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class BindPositionsComponent {
  todo : string[] = [];

  done : string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
