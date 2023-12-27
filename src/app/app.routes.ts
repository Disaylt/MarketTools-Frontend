import { Routes } from '@angular/router';
import { StandardAutoresponderComponent } from './features/WB/standard-autoresponder/standard-autoresponder.component';
import { ViewTestComponent } from './features/view-test/view-test.component';

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
                        component: StandardAutoresponderComponent,
                        children:[
                            {
                                path:"columns",
                                component:ViewTestComponent
                            },
                            {
                                path: "recommendation-table",
                                component:ViewTestComponent
                            }
                        ]
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
