import { Route } from "@angular/router";
import { OzonMarketplaceComponent } from "./ozon-marketplace.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const ozonRoute : Route = 
{
    title : "Ozon",
    path : "ozon",
    component : OzonMarketplaceComponent,
    children : [
        {
            path: "",
            redirectTo : "info",
            pathMatch : "full"
        },
        {
            title : "Информация",
            path : "info",
            component : DashboardComponent
        }
    ]
}