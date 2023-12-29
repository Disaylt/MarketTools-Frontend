import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BindWordHelp } from './models/bind-words-help.model';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';

@Component({
  selector: 'app-recommendation-bind-words',
  standalone: true,
  imports: [CommonModule, RouterModule, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './recommendation-bind-words.component.html',
  styleUrl: './recommendation-bind-words.component.scss'
})
export class RecommendationBindWordsComponent {
  isShow : boolean = true;
  
  bindWordsHelp : BindWordHelp[] = [
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

  copy(name : string){
    navigator.clipboard.writeText(name);
  }

  changeShow(value : boolean){
    this.isShow = value;
  }
}
