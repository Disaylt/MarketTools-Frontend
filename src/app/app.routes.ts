import { Routes } from '@angular/router';
import { StandardAutoresponderComponent } from './features/WB/standard-autoresponder/standard-autoresponder.component';

export const routes: Routes = [
    {
        path : "wb",
        title : "WB",
        children : [
            {
                path: "autoresponder",
                title : "Автоответчик",
                children: [
                    {
                        path: "standard",
                        title : "Стандартный",
                        component: StandardAutoresponderComponent
                    }
                ]
            },
            {
                path : "stats",
                title : "Статистика",
                component : StandardAutoresponderComponent
            }
        ]
    }
];
