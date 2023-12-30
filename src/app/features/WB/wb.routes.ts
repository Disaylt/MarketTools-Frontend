import { Routes } from "@angular/router";
import { ViewTestComponent } from "../view-test/view-test.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { autoresponderRoutes } from "../autoresponder/autoresponder.routes";

export const wbRoutes : Routes = [
    {
        path: "",
        redirectTo: "info",
        pathMatch: "full"
    },
    {
        path : "info",
        component: DashboardComponent
    },
    {
        path : "autoresponder",
        children : autoresponderRoutes
    }
]