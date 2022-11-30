import { environment } from './../environments/environment';
import { ServerErrorInterceptorService } from './_shared/server-error-interceptor.service';
import { MaterialModule } from './_material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { AgregarconductorComponent } from './pages/conductor/agregarconductor/agregarconductor.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculoComponent';
import { AgregarvehiculoComponent } from './pages/vehiculo/agregarvehiculo/agregarvehiculo.component';
import { AsociaciondialogoComponent } from './pages/vehiculo/asociaciondialogo/asociaciondialogo.component';
import { ErrorComponent } from './pages/error/error.component';
import { Not404Component } from './pages/not404/not404.component';
import { Not401Component } from './pages/not401/not401.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoComponent,
    VehiculoComponent,
    AgregarvehiculoComponent,
    AsociaciondialogoComponent,
    CiudadComponent,
    ConductorComponent,
    AgregarconductorComponent,
    Not404Component,
    ErrorComponent,
    LoginComponent,
    Not401Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['157.230.49.177:8080'],
        blacklistedRoutes: ['http://157.230.49.177:8080/movitapp-backend-seguridad/oauth/token']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
