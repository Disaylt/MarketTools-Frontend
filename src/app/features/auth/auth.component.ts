import { Component } from '@angular/core';
import { TabBarButtonComponent } from "../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { TabBarComponent } from "../../shared/components/tab-bar/tab-bar.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [TabBarButtonComponent, TabBarComponent, RouterOutlet, RouterModule]
})
export class AuthComponent {

}
