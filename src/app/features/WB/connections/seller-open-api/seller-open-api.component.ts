import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { NewConnectionModalComponent } from './components/new-connection-modal/new-connection-modal.component';

@Component({
  selector: 'app-seller-open-api',
  standalone: true,
  imports: [],
  templateUrl: './seller-open-api.component.html',
  styleUrl: './seller-open-api.component.scss'
})
export class SellerOpenApiComponent {

  constructor(private dialog: Dialog){}

  openAddModal(){
    const modal = this.dialog.open(NewConnectionModalComponent);
  }
}
