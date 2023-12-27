import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonComponent } from "../buttons/icon-button/icon-button.component";

@Component({
    selector: 'app-tab-bar',
    standalone: true,
    templateUrl: './tab-bar.component.html',
    styleUrl: './tab-bar.component.scss',
    imports: [MatIconModule, IconButtonComponent]
})
export class TabBarComponent{
  
  @ViewChild('tabbar') containerRef!: ElementRef;
  
  scrollToRight(){
    const container: HTMLElement = this.containerRef.nativeElement;
    container.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }

  scrollToLeft(){
    const container: HTMLElement = this.containerRef.nativeElement;
    container.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }
}
