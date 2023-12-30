import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { ViewTestComponent } from './features/view-test/view-test.component';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { wbRoutes } from './features/WB/wb.routes';


export const authDashboardGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const token = inject(AuthService).getToken();
        if(token != null){
            return true;
        }
        const router: Router = inject(Router);
        
        return false || router.createUrlTree(["/auth"]);
};

export const routes: Routes = [
    {
        path : "dashboard",
        component : DashboardComponent,
        canActivate : [authDashboardGuard],
        canActivateChild : [authDashboardGuard],
        children : [
            {
                path: "",
                redirectTo: "wb/info",
                pathMatch: "full"
            },
            {
                path : "wb",
                title : "WB",
                children : wbRoutes
            }
        ]
    },
    {
        path : "auth",
        component : AuthComponent,
        children : [
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            },
            {
                path : "login",
                component : LoginComponent
            },
            {
                path : "register",
                component : RegisterComponent
            }
        ]
    },
    {
        path:"**", 
        redirectTo:"/dashboard"
    }
];
