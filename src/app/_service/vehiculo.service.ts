import { Vehiculo } from './../_model/Vehiculo';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url: string = `${environment.HOST}/vehiculos`;

  mensajeCambio = new Subject<string>();


  constructor(private http: HttpClient) { }

  listarPaginado(page: number, size: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  listarPorId(idVehiculo: number) {
    return this.http.get<Vehiculo>(`${this.url}/listar/${idVehiculo}`);
  }

  desasociarConductor(idUsuario: number, idVehiculo: number){
    return this.http.post(`${this.url}/desasociarconductor/${idUsuario}/${idVehiculo}`, idUsuario);
  }

  asociarconductor(idUsuario: number, idVehiculo: number){
    return this.http.post(`${this.url}/asociarcondcutor/${idUsuario}/${idVehiculo}`, idUsuario);
  }

  guardar(vehiculo: Vehiculo) {
    return this.http.post(`${this.url}/guardar`, vehiculo);
  }

  editar(vehiculo: Vehiculo) {
    return this.http.put(`${this.url}/editar`, vehiculo);
  }


}
