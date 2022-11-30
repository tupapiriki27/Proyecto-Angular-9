import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  cerrarSesion() {
    if (this.estaLogueado()) {
      let token = sessionStorage.getItem(environment.TOKEN_NAME);

      this.http.get(`${environment.HOST}/cerrarSesion/anular/${token}`).subscribe(() => {
        sessionStorage.clear();
        this.router.navigate(['']);
      });
    }else{
      this.router.navigate(['']);
    }
  }

  estaLogueado(): boolean {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token !== null;
  }
}
