import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehiculo } from './../../../_model/Vehiculo';
import { VehiculoService } from './../../../_service/vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.component.html',
  styleUrls: ['./agregarvehiculo.component.css']
})
export class AgregarvehiculoComponent implements OnInit {

  form: FormGroup;
  private id: number;
  private edicion: boolean;

  constructor(private vehiculoService: VehiculoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.inicializarFormularioVacio();

    if (this.edicion === true) {
      this.cargarDatos();
    }

  }

  inicializarFormularioVacio() {
      this.form = new FormGroup({
        'placa': new FormControl('', [Validators.required]),
        'modelo': new FormControl(0, [Validators.required, Validators.min(2005), Validators.max(2022)]),
        'marca': new FormControl('', [Validators.required]),
        'capacidad': new FormControl('', [Validators.required]),
        'tipoVehiculo': new FormControl('', [Validators.required]),
    });
  }

  cargarDatos() {
      this.vehiculoService.listarPorId(this.id).subscribe(data =>{
          this.form.get("placa").setValue(data.placa);
          this.form.get("modelo").setValue(data.modelo);
          this.form.get("marca").setValue(data.marca);
          this.form.get("capacidad").setValue(data.capacidad);
          this.form.get("tipoVehiculo").setValue(data.tipoVehiuclo);
      });
  }



  guardar() {

      let vehiculo = new Vehiculo();
      vehiculo.placa = this.form.value['placa'];
      vehiculo.modelo = this.form.value['modelo'] + '';
      vehiculo.marca = this.form.value['marca'];
      vehiculo.tipoVehiuclo = this.form.value['tipoVehiculo'];
      vehiculo.capacidad = this.form.value['capacidad'];

      if (this.edicion === true) {
        vehiculo.idVehiculo = this.id;
        this.vehiculoService.editar(vehiculo).subscribe(() => {
          this.form.reset();
          this.vehiculoService.mensajeCambio.next('Vehículo editado satisfactoreamente');
          this.router.navigate(['/vehiculo']);
        });
      } else {
        this.vehiculoService.guardar(vehiculo).subscribe(() => {
          this.form.reset();
          this.vehiculoService.mensajeCambio.next('Vehículo guadado satisfactoreamente');
          this.router.navigate(['/vehiculo']);
        });
      }
  }


  get placa() {
    return this.form.get('placa');
  }

  get modelo() {
    return this.form.get('modelo');
  }

  get marca() {
    return this.form.get('marca');
  }

  get capacidad() {
    return this.form.get('capacidad');
  }

  get tipoVehiculo() {
    return this.form.get('tipoVehiculo');
  }

}
