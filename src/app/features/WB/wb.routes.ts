import { Route, Routes } from "@angular/router";
import { ViewTestComponent } from "../view-test/view-test.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { autoresponderRoutes } from "../autoresponder/autoresponder.routes";
import { WbMarketplaceComponent } from "./wb-marketplace.component";

export const wbRoute : Route =
{
    path : "wb",
    component: WbMarketplaceComponent,
    children : [
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
} 