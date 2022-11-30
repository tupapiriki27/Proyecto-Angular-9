import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptorService implements HttpInterceptor{

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }
        }
      })).pipe(catchError((err) => {
        if (err.status === 400 && err.error.error_description === 'Bad credentials') {
          this.openSnackBar('Usuario o contraseña incorrecta');
        } else if (err.status === 401 && err.error.error_description === '----Nick o password incorecto') {
          this.openSnackBar('Usuario o contraseña incorrecta');
        } else {
          this.router.navigate([`/error/${err.status}/${err.error.error}`]);
        }
        return EMPTY;
      }));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 3000,
    });
  }
}
