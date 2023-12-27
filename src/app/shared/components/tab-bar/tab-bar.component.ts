import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonComponent } from "../buttons/icon-button/icon-button.component";
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab-bar',
    standalone: true,
    templateUrl: './tab-bar.component.html',
    styleUrl: './tab-bar.component.scss',
    imports: [MatIconModule, IconButtonComponent, CommonModule]
})
export class TabBarComponent{
  
  isShowScrollButton : boolean  = false;
  @ViewChild('tabbar') containerRef!: ElementRef;

  @HostListener('scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onScrollOrResize(event: any) {
    this.checkViewScroll();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkViewScroll();
    });
  }

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

  private checkViewScroll(){
    const container: HTMLElement = this.containerRef.nativeElement;
    this.isShowScrollButton = container.clientWidth != container.scrollWidth;
  }
}
