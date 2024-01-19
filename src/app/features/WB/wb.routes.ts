import { Route, Routes } from "@angular/router";
import { ViewTestComponent } from "../view-test/view-test.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { autoresponderRoutes } from "../autoresponder/autoresponder.routes";
import { WbMarketplaceComponent } from "./wb-marketplace.component";
import { connectionRoutes } from "./connections/connections.routes";

export const wbRoute : Route =
{
    title : "WB",
    path : "wb",
    component: WbMarketplaceComponent,
    children : [
        {
            path: "",
            redirectTo: "info",
            pathMatch: "full"
        },
        {
            title : "Информация",
            path : "info",
            component: DashboardComponent
        },
        {
            title : "Автоответчик",
            path : "autoresponder",
            children : autoresponderRoutes
        },
        {
            title : "Подключения",
            path : "connections",
            children : connectionRoutes
        }
    ]
} 