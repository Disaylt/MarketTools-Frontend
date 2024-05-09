import { Component, Input } from '@angular/core';
import { BaseConnectionV2 } from '../../models/marketplace-connections-v2.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connection-v2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connection-v2.component.html',
  styleUrl: './connection-v2.component.scss'
})
export class ConnectionV2Component {
  @Input({required : true}) value! : BaseConnectionV2;

  coonectionTypes : string[] = ["API", "Аккаунт"]
  selecctedConnectionType : string | null = null;
}
