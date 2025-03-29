import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './core-module/core-module.module';
import { GlobalErrorHandler } from './global/error-handler/error-handler';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiRouteInterceptor } from './global/Interceptor/api-route.interceptor';
import { CookieService } from 'ngx-cookie-service';

//PrimeNG Config
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { RouterModule } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModuleModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [CookieService,
    {provide:ErrorHandler, useClass:GlobalErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: ApiRouteInterceptor, multi: true},
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
