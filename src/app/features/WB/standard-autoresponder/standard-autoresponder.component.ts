import { Component } from '@angular/core';
import { TabBarComponent } from "../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-standard-autoresponder',
    standalone: true,
    templateUrl: './standard-autoresponder.component.html',
    styleUrl: './standard-autoresponder.component.scss',
    imports: [TabBarComponent, TabBarButtonComponent, RouterModule]
})
export class StandardAutoresponderComponent {

}
