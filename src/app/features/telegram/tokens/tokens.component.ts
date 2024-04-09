import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenService } from './services/token.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [FormsModule, CommonModule, ClipboardModule],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss'
})
export class TokensComponent {
  isLoad : boolean = false;
  token : string | null = null;

  constructor(private tokenService : TokenService){}

  create(){
    this.isLoad = true;

    this.tokenService
      .create()
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe({
        next : x=> {
          this.token = x.value;
        }
      })
  }
}
