import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HostService } from "../services/host.service";

@Injectable()
export class HostHttpInterceptor implements HttpInterceptor{

    constructor(private hostService : HostService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            url: `${this.hostService.hostUrl}${req.url}`
        })

        return next.handle(authReq);
    }
    
}