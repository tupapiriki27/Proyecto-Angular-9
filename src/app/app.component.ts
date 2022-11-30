import { GuardianService } from './_shared/guardian.service';
import { LoginService } from './_service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'my-app';

  constructor(private loginService: LoginService, private router: Router, private guardian: GuardianService){}

  obtenerRol(rol: string){
    const helper = new JwtHelperService();
    const rpta = this.loginService.estaLogueado();
    if (rpta) {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token)) {
        const decodedToken = helper.decodeToken(token);
        const roles: string[] = decodedToken.authorities;
        return roles.includes(rol);
      }
    }

    return false;
  }

  logueado(){
    return this.loginService.estaLogueado();
  }

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
