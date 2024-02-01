import { Component } from '@angular/core';
import { RatingBarComponent } from "../../../../../shared/components/rating-bar/rating-bar.component";

@Component({
    selector: 'app-response-testing',
    standalone: true,
    templateUrl: './response-testing.component.html',
    styleUrl: './response-testing.component.scss',
    imports: [RatingBarComponent]
})
export class ResponseTestingComponent {
  name = 'Angular '

}
