import { CiudadService } from './../../_service/ciudad.service';
import { Ciudad } from './../../_model/Ciudad';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { Departamento } from 'src/app/_model/Departamento';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  displayedColumns: string[] = ['idCiudad', 'nombre'];

  displayedDepartamento: Departamento[];

  dataSource = new MatTableDataSource<Ciudad>();

  id: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private services: CiudadService, private servicesD: DepartamentoService) { }

  ngOnInit(): void {
    this.servicesD.listar().subscribe(data => {
      this.displayedDepartamento = data;
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applySelect(id: string){
    this.services.listarC(id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
