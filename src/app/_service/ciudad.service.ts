import { environment } from './../../environments/environment';
import { Ciudad } from './../_model/Ciudad';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  url: string = `${environment.HOST}/departamentos/ciudad/listarPorDepartamnto`;

  constructor(private http: HttpClient) { }

  listarC(id: string) {
    return this.http.get<Ciudad[]>(`${this.url}/` + id);
  }
}
