import { Routes } from "@angular/router";
import { SellerOpenApiComponent } from "./seller-open-api/seller-open-api.component";

export const connectionRoutes : Routes = [
    {
        title : "API",
        path : "seller/open-api",
        component: SellerOpenApiComponent
    }
]