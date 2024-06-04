import { Routes } from "@angular/router";
import { GeneralComponent } from "./general/general.component";

export const analyticRoutes : Routes = [
    {
        path: "general",
        title : "Общая",
        component : GeneralComponent
    }
]