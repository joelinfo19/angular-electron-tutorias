import {Estudiante} from './estudiante.model';
import {Docente} from './docente.model';
import DateTimeFormat = Intl.DateTimeFormat;

export class Tutoria {

  constructor(
    public direccion?: string,
    public codigo?:string,
    public fecha?:Object,
    public tipoTutoria?:string,
    public descripcion?:string,
    public _id?: string,
    public img?: string,
    public estudiante?: Estudiante,
    public docente?: Docente
  ) {}

}
