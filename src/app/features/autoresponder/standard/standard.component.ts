import { Component } from '@angular/core';
import { TabBarComponent } from "../../../shared/components/tab-bar/tab-bar.component";
import { TabBarButtonComponent } from "../../../shared/components/tab-bar/tab-bar-button/tab-bar-button.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-standard',
  standalone: true,
  imports: [TabBarComponent, TabBarButtonComponent, RouterModule],
  templateUrl: './standard.component.html',
  styleUrl: './standard.component.scss'
})
export class StandardComponent {

}
