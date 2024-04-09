import { Component } from '@angular/core';
import { VariableHelp } from './models/variable-help.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-recommendation-variables-clue',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuTrigger, CdkMenu, CdkMenuItem, ClipboardModule],
  templateUrl: './recommendation-variables-clue.component.html',
  styleUrl: './recommendation-variables-clue.component.scss'
})
export class RecommendationVariablesClueComponent {
  isShow : boolean = true;
  
  bindWordsHelp : VariableHelp[] = [
    {
      name:"$buy_article$",
      text:[
        "При создании ответа, $buy_article$ заменяется на артикул который купили.",
        "До: Спасибо что купили артикул [$buy_article$]",
        "После: Спасибо что купили артикул [54353453]"
      ]
    },
    {
      name:"$buy_name$",
      text:[
        "При создании ответа, $buy_name$ заменяется на название для купленного артикула из таблицы рекомендаций.",
        "До: Спасибо что купили $buy_name$ [$buy_article$]",
        "После: Спасибо что купили Игрушечную машинку [54353453]"
      ]
    },
    {
      name:"$rec_article$",
      text:[
        "При создании ответа, $rec_article$ заменяется на рекомендованный артикул из таблицы рекомендаций, принадлежащий купленному товару.",
        "До: Спасибо что купили $buy_name$ [$buy_article$], посмотрите артикул [$rec_article$]",
        "После: Спасибо что купили Игрушечную машинку [54353453], посмотрите артикул [45763453]"
      ]
    },
    {
      name:"$rec_name$",
      text:[
        "При создании ответа, $rec_name$ заменяется на рекомендованное название из таблицы рекомендаций, принадлежащий купленному товару.",
        "До: Спасибо что купили $buy_name$ [$buy_article$], посмотрите $rec_name$ [$rec_article$]",
        "После: Спасибо что купили Игрушечную машинку [54353453], посмотрите Игрушечный поезд [45763453]"
      ]
    }
  ]

  changeShow(value : boolean){
    this.isShow = value;
  }
}
