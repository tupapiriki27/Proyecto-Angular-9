import { ConductorService } from 'src/app/_service/conductor.service';
import { Conductor } from 'src/app/_model/Conductor';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'correo', 'acciones'];

  dataSource = new MatTableDataSource<Conductor>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex = 0;
  pageSize = 5;

  constructor(private conductorService: ConductorService, public route: ActivatedRoute,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conductorService.mensajeCambio.subscribe(data => {
      this.openSnackBar(data);
      this.listarPaginado();
    });

    this.listarPaginado();
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado(){
    this.conductorService.listar(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 3000,
    });
  }

  eliminar(id){
    this.conductorService.eliminar(id).subscribe(data => {
      this.conductorService.mensajeCambio.next('Conductor eliminado satisfactoreamente');
      this.router.navigate(['/conductor']);
    });
}
}
