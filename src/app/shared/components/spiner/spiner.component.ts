import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spiner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.scss'
})
export class SpinerComponent {
  @Input() size : string = "";
  
  getSizeClass() : string{
    switch(this.size){
      case "big":
        return this.size;
      case "sm":
        return "spinner-border-sm";
    }

    return "";
  }
}
