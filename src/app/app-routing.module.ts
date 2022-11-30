import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarconductorComponent } from './pages/conductor/agregarconductor/agregarconductor.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculoComponent';
import { AgregarvehiculoComponent } from './pages/vehiculo/agregarvehiculo/agregarvehiculo.component';
import { Not404Component } from './pages/not404/not404.component';
import { Not401Component } from './pages/not401/not401.component';
import { GuardianService } from './_shared/guardian.service';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {path: '', component : LoginComponent},
  {path: 'usuario', component : DepartamentoComponent, canActivate: [GuardianService]},
  {path: 'ciudad', component : CiudadComponent, canActivate: [GuardianService]},
  {path: 'conductor', component : ConductorComponent, children: [
    {path: 'agregar', component : AgregarconductorComponent},
    {path: 'edicion/:id', component: AgregarconductorComponent}
  ], canActivate: [GuardianService]},
  {path: 'vehiculo', component: VehiculoComponent, children : [
    {path: 'agregar', component: AgregarvehiculoComponent},
    {path: 'edicion/:id', component: AgregarvehiculoComponent}
  ], canActivate: [GuardianService]},
  {path: 'error/:status/:message', component: ErrorComponent},
  {path: 'not-401', component: Not401Component},
  {path: '**', component: Not404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
