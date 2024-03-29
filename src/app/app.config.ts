import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHttpInterceptor } from './core/interceptor/error-http-interceptor';
import { AuthHttpInterceptor } from './core/interceptor/auth-http-interceptor';
import { HostHttpInterceptor } from './core/interceptor/host-http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),
    {provide : HTTP_INTERCEPTORS, useClass : ErrorHttpInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : HostHttpInterceptor, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : AuthHttpInterceptor, multi: true}
  ]
};
