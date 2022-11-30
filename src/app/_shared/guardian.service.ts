import { LoginService } from './../_service/login.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GuardianService {

  constructor(private router: Router, private loginService: LoginService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    const rpta = this.loginService.estaLogueado();
    if (rpta) {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token)) {

        const url = state.url;
        const decodedToken = helper.decodeToken(token);
        const rol: string[] = decodedToken.authorities;

        if (url.includes('/departamento') && rol.includes('Administrador')) {
          return true;
        } else if (url.includes('/ciudad') && rol.includes('Administrador')) {
          return true;
        } else if (url.includes('/conductor') && rol.includes('Administrador')) {
          return true;
        } else if (url.includes('/vehiculo') && rol.includes('Despachador')) {
          return true;
        }

        this.router.navigate(['not-401']);
        return false;

      } else {
        this.loginService.cerrarSesion();
        return false;
      }
    } else {
      this.router.navigate(['not-401']);
      return false;
    }
  }
}
