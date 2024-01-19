import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor{

    constructor(private toastsService : ToastrService, private asuthService : AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                switch(error.status){
                    case 401:
                        break;
                    case 403:
                        break;
                    case 404:
                        this.sendAlerts(error.error, "Объект не найден");
                        return throwError(() => error.message);
                }
                this.sendAlerts(error.error, "Критическая ошибка");

                return throwError(() => error.message);
            })
          );
    }
    
    private sendAlerts(errorBody : any, notBodyMessage : string){
        try{
            for(const key of Object.keys(errorBody.errors)){
                const values = errorBody.errors[key] as string[];
                values.forEach(message=> {
                    this.toastsService.error(message, "", {
                        progressBar : true,
                        closeButton : true,
                        toastClass: "ngx-toastr shadow-none rounded-3 app-error-alert-bg"
                    });
                })
              }
        }
        catch{
            this.toastsService.error(notBodyMessage, "", {
                progressBar : true,
                closeButton : true,
                toastClass: "ngx-toastr shadow-none rounded-3 app-error-alert-bg"
            });
        }
    }
}