import { TipoDocumento } from 'src/app/_model/TipoDocumento';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Rol } from 'src/app/_model/Rol';


export class Conductor {
    idUsuario: number;
    documento: string;
    nombre: string;
    apellido: string;
    nick: string;
    clave: string;
    estado: true;
    cambioContrasena: true;
    nombreEmpresa = '';
    direccion: string;
    cargo = '';
    telefono = '';
    celular: string;
    celularAux: string;
    correo: string;
    tipoDocumento = new TipoDocumento();
    rol = new Rol();
    ciudad: Ciudad;
}