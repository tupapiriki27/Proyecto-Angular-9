import { GuardianService } from './../../_shared/guardian.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  contrasena: string;

  constructor(private loginService: LoginService, private router: Router, private guardianService: GuardianService) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.usuario, this.contrasena).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(data.access_token);
      const rol: string[] = decodedToken.authorities;

      if (rol.includes('Administrador')) {
        this.router.navigate(['/departamento']);
      } else {
        this.router.navigate(['/vehiculo']);
      }
    });
  }
}
