import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-black-lists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './black-lists.component.html',
  styleUrl: './black-lists.component.scss'
})
export class BlackListsComponent {
  newName : string = "";
}
