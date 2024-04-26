import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Filter } from '../models/filter.model';
import { FilterUtility } from '../Utilities/default-filter.utility';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input({required : true}) filter! : Filter;
  @Output() changed : EventEmitter<void> = new EventEmitter();

  subjects : string[] = ["Информация", "Показатели", "Статусы"]
  selectedSubject : string | null = null;

  selectSubject(subject : string){
    this.selectedSubject = subject;
  }

  reset(){
    FilterUtility.reset(this.filter);
    this.changed.emit();
  }
}
