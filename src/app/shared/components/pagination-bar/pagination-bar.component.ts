import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../../core/models/pagination.model';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent implements OnInit {

  maxPage : number = 0;
  @Input() paginationDetails : Pagination = {
    take : 30,
    skip :0
  }
  @Output() onChangePage : EventEmitter<Pagination> = new EventEmitter<Pagination>();

  firstViewPageNumber : number | null = null;
  middleViewPageNumbers : number[] = [];
  lastViewPageNumber : number | null = null;
  page : number = 1;
  isLoad : boolean = false;

  constructor(private router : Router, private activeRoute : ActivatedRoute){}

  ngOnInit(): void {
    const page = this.activeRoute
      .snapshot
      .queryParams["page"];

    if(page as number){
      this.page = Number.parseInt(page);
      this.paginationDetails.skip = (page - 1) * this.paginationDetails.take;
    }
  }

  updateTotal(value : number){
    setTimeout(() => {
      this.maxPage = Math.ceil(value/this.paginationDetails.take);
      if(this.maxPage < this.page){
        this.selectPage(this.maxPage)
      }
      this.setActivePages();
    })
  }

  selectPage(page : number){
    if(page <= 0){
      return;
    }

    const queryParams = {"page" : page}
    this.router.navigate([],{queryParams: queryParams, queryParamsHandling : "merge"})
    this.page = page;
    this.paginationDetails.skip = (page - 1) * this.paginationDetails.take;
    this.onChangePage.emit(this.paginationDetails);
  }

  private setActivePages(){
    this.firstViewPageNumber = null;
    this.middleViewPageNumbers = [];
    this.lastViewPageNumber = null;

    if(this.maxPage <= 0){
      return;
    }

    this.firstViewPageNumber = 1;

    if(this.maxPage > 1){
      this.lastViewPageNumber = this.maxPage;
    }
    else{
      return;
    }

    let rangePages = 1;
    if(this.page === this.firstViewPageNumber || this.page === this.lastViewPageNumber){
      rangePages = 3
    }
    else if(this.page === this.firstViewPageNumber + 1 || this.page === this.lastViewPageNumber - 1){
      rangePages = 2
    }

    for(let i = this.page - rangePages; i <=this.page + rangePages; i++){
      if(i > this.firstViewPageNumber && i < this.lastViewPageNumber){
        this.middleViewPageNumbers.push(i);
      }
    }
  }

}
