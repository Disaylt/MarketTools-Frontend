import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinerComponent } from "../../../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-search-words',
    standalone: true,
    templateUrl: './search-words.component.html',
    styleUrl: './search-words.component.scss',
    imports: [CommonModule,
        FormsModule,
        CdkMenuTrigger,
        CdkMenu,
        CdkMenuItem, SpinerComponent]
})
export class SearchWordsComponent {

  isLoadAddButton = false;
  newWord: string = "";

  add() {
    throw new Error('Method not implemented.');
    }
}
