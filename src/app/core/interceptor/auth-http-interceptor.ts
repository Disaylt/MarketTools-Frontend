import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{

    constructor(private authService : AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        const authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        })

        return next.handle(authReq);
    }
    
}