import { Routes } from "@angular/router";
import { StandardComponent } from "./standard/standard.component";
import { ColumnsComponent } from "./standard/pages/columns/columns.component";
import { RecommendationTableComponent } from "./standard/pages/recommendation-table/recommendation-table.component";
import { CellsComponent } from "./standard/pages/columns/pages/cells/cells.component";
import { BlackListsComponent } from "./standard/pages/black-lists/black-lists.component";
import { BanWordsComponent } from "./standard/pages/black-lists/components/ban-words/ban-words.component";
import { TemplatesComponent } from "./standard/pages/templates/templates.component";
import { ConnectionComponent } from "./standard/pages/connection/connection.component";
import { ResponseTestingComponent } from "./standard/pages/response-testing/response-testing.component";
import { ReportsComponent } from "./standard/pages/reports/reports.component";

export const autoresponderRoutes : Routes = [
    {
        path: "standard",
        title : "Стандартный",
        component: StandardComponent,
        children:[
            {
                title : "Колонки",
                path:"columns",
                component:ColumnsComponent
            },
            {
                title : "Таблица рекомендаций",
                path: "recommendation-table",
                component:RecommendationTableComponent
            },
            {
                title : "Черный список",
                path : "black-lists",
                component : BlackListsComponent
            },
            {
                title : "Шаблоны",
                path : "templates",
                component : TemplatesComponent
            },
            {
                title : "Настройки",
                path : "settings",
                component : ConnectionComponent
            },
            {
                title : "Тестирование",
                path : "testing",
                component : ResponseTestingComponent
            },
            {
                title : "Отчеты",
                path : "reports",
                component : ReportsComponent
            }
        ]
    }
]