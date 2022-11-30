import { Component, OnInit } from '@angular/core';
import { ConductorService } from 'src/app/_service/conductor.service';
import { Conductor } from 'src/app/_model/Conductor';
import { Departamento } from 'src/app/_model/Departamento';
import { Ciudad } from 'src/app/_model/Ciudad';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from 'src/app/_service/ciudad.service';
import { DepartamentoService } from 'src/app/_service/departamento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-agregarconductor',
  templateUrl: './agregarconductor.component.html',
  styleUrls: ['./agregarconductor.component.css']
})
export class AgregarconductorComponent implements OnInit {
  displayedDepartamento: Departamento[];
  displayedCiudad: Ciudad[];

  form: FormGroup;
  private id: number;
  private edicion: boolean;

  constructor(private services: CiudadService, private servicesD: DepartamentoService,
              private conductorService: ConductorService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.inicializarFormulario();

    if (this.edicion === true) {
      this.cargarDatos();
    }
  }

  inicializarFormulario(){
    this.servicesD.listar().subscribe(data => {
      this.displayedDepartamento = data;
    });

    this.form = new FormGroup({
      'depSelec': new FormControl(0),
      'ciudadSelec': new FormControl(Ciudad, [Validators.required]),
      'idUsuario': new FormControl(0, [Validators.required]),
      'documento': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', [Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'nick': new FormControl('', [Validators.required]),
      'clave': new FormControl('', [Validators.required]),
      'direccion': new FormControl('', [Validators.required]),
      'celular': new FormControl('', [Validators.required]),
      'celularAux': new FormControl('', [Validators.required]),
      'correo': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  applySelect(id: string) {
    this.services.listarC(id).subscribe(data => {
      this.displayedCiudad = data;
    });
  }

  agregar(){
    let conductor = new Conductor();
    conductor.idUsuario = this.form.value['idUsuario'];
    conductor.documento = this.form.value['documento'];
    conductor.nombre = this.form.value['nombre'];
    conductor.apellido = this.form.value['apellido'];
    conductor.nick = this.form.value['documento'];
    conductor.clave = this.form.value['clave'];
    conductor.direccion = this.form.value['direccion'];
    conductor.celular = this.form.value['celular'];
    conductor.celularAux = this.form.value['celularAux'];
    conductor.correo = this.form.value['correo'];

    conductor.ciudad = this.displayedCiudad.find(e => e.idCiudad === this.form.value['ciudadSelec']);

    if (this.edicion === true) {
      conductor.idUsuario = this.id;
      this.conductorService.editarConductor(conductor).subscribe(() => {
        this.form.reset();
        this.conductorService.mensajeCambio.next('Conductor editado satisfactoreamente');
        this.router.navigate(['/conductor']);
      });
    } else {
      this.conductorService.guardar(conductor).subscribe(() => {
        this.form.reset();
        this.conductorService.mensajeCambio.next('Conductor guadado satisfactoreamente');
        this.router.navigate(['/conductor']);
      });
    }
  }

  cargarDatos() {
    this.conductorService.listarPorId(this.id).subscribe(data => {
        this.form.get("documento").setValue(data.documento);
        this.form.get("nombre").setValue(data.nombre);
        this.form.get("apellido").setValue(data.apellido);
        this.form.get("nick").setValue(data.nick);
        this.form.get("clave").setValue(data.clave);
        this.form.get("direccion").setValue(data.direccion);
        this.form.get("celular").setValue(data.celular);
        this.form.get("celularAux").setValue(data.celularAux);
        this.form.get("correo").setValue(data.correo);
        this.form.get("depSelec").setValue(data.ciudad.departamento.idDepartamento);
        this.services.listarC(data.ciudad.departamento.idDepartamento + '').subscribe(ciu => {
          this.displayedCiudad = ciu;
          this.form.get("ciudadSelec").setValue(data.ciudad.idCiudad);
        });
    });
  }
}
