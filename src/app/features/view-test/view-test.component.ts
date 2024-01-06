import { Component } from '@angular/core';
import { of, timeout } from 'rxjs';

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [],
  templateUrl: './view-test.component.html',
  styleUrl: './view-test.component.scss'
})
export class ViewTestComponent {
  sub(){
    const myObservable = of(1, 2, 3);

    // Execute with the observer object
    myObservable.subscribe({
      next: (data) => {
        this.time();
        console.log(data);
      }
    });
  }

  time(){
    setTimeout(() => {
      console.log("asdasdasd")
    }, (1000));
  }
}
