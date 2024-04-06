import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss'
})
export class TokensComponent {
  isLoad : boolean = false;
  token : string | null = "3242-6asdd3-423rsr-4234";
}
