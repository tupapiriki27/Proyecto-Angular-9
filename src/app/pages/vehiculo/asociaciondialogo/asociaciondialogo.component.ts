import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Conductor } from 'src/app/_model/Conductor';
import { ConductorService } from 'src/app/_service/conductor.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-asociaciondialogo',
  templateUrl: './asociaciondialogo.component.html',
  styleUrls: ['./asociaciondialogo.component.css']
})
export class AsociaciondialogoComponent implements OnInit {

  idVehiculo: number;
  idConductor: number;

  displayedColumns: string[] = ['nombre', 'apellido', 'acciones'];

  dataSource = new MatTableDataSource<Conductor>();
  displayedConductor: Conductor[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<AsociaciondialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private conductorService: ConductorService, public route: ActivatedRoute,
              private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.idVehiculo = this.data.idVehiculo;
    this.listarPaginado();
    this.listarConductorNoAsociado();
  }

  listarPaginado(){
    this.conductorService.listarConductorAsociados(this.idVehiculo).subscribe(conductor => {
      this.dataSource = conductor;
      this.dataSource.sort = this.sort;
    });
  }

  listarConductorNoAsociado() {
    this.conductorService.listarConductorNoAsociado(this.idVehiculo).subscribe(conductor => {
      this.displayedConductor = conductor;
    });
  }

  asociar(){
    this.vehiculoService.asociarconductor(this.idConductor, this.idVehiculo).subscribe(conductor => {
      this.listarPaginado();
      this.listarConductorNoAsociado();
    });
  }

  eliminar(id: number) {
    this.vehiculoService.desasociarConductor(id, this.idVehiculo).subscribe(conductor => {
      this.listarPaginado();
      this.listarConductorNoAsociado();
    });
  }

  cerrarDialogo(){
    this.dialogRef.close({event: 'Cancelo'});
  }

  idSeleccionado(id: number){
    this.idConductor = id;
  }
}
