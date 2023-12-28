import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { StandardAutoresponderComponent } from './features/WB/standard-autoresponder/standard-autoresponder.component';
import { ViewTestComponent } from './features/view-test/view-test.component';
import { ColumnsComponent } from './features/WB/standard-autoresponder/columns/columns.component';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';


export const authDashboardGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const token = inject(AuthService).getToken();

        console.log(token);

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
                redirectTo: "wb/stats",
                pathMatch: "full"
            },
            {
                path : "wb",
                title : "WB",
                children : [
                    {
                        path: "",
                        redirectTo: "stats",
                        pathMatch: "full"
                    },
                    {
                        path: "autoresponder",
                        title : "Автоответчик",
                        children: [
                            {
                                path: "standard",
                                title : "Стандартный",
                                component: StandardAutoresponderComponent,
                                children:[
                                    {
                                        path:"columns",
                                        component:ColumnsComponent
                                    },
                                    {
                                        path: "recommendation-table",
                                        component:ViewTestComponent
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path : "stats",
                        title : "Статистика",
                        component : StandardAutoresponderComponent
                    }
                ]
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
