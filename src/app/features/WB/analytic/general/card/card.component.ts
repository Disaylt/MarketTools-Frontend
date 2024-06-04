import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CdkMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    providers: [],
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ModalComponent, CommonModule, FormsModule, CdkMenuTrigger, CdkMenu, CdkMenuItem]
})
export class CardComponent {

  selected: Date | null = null;
  
  constructor(public dialogRef: DialogRef<any>){}
}

