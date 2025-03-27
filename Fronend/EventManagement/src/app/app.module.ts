import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { GlobalErrorHandler } from './global/error-handler/error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiRouteInterceptor } from './global/Interceptor/api-route.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationModule } from './authentication/authentication.module';

//PrimeNG Config
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/Material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    MatSnackBarModule,
    AuthenticationModule
  ],
  providers: [CookieService,
    {provide:ErrorHandler, useClass:GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: ApiRouteInterceptor, multi: true},
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Material
            }
        })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
