import { Routes } from "@angular/router";
import { PricesComponent } from "./prices/prices.component";

export const monitoringRoutes : Routes = [
    {
        path: "price",
        title : "Цены",
        component : PricesComponent
    }
]