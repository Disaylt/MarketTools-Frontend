import { Routes } from "@angular/router";
import { StandardComponent } from "./standard/standard.component";
import { ColumnsComponent } from "./standard/pages/columns/columns.component";
import { RecommendationTableComponent } from "./standard/pages/recommendation-table/recommendation-table.component";
import { CellsComponent } from "./standard/pages/columns/pages/cells/cells.component";

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
            }
        ]
    }
]