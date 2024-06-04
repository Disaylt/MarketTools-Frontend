import { Routes } from "@angular/router";
import { GeneralComponent } from "./general/general.component";
import { MenuComponent } from "./general/menu/menu.component";

export const analyticRoutes : Routes = [
    {
        path: "general",
        title : "Общая",
        children : [
            {
                path: "",
                redirectTo: "menu",
                pathMatch: "full"
            },
            {
                path : "menu",
                component : MenuComponent
            }
        ]
    }
]