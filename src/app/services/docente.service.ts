import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Estudiante} from '../models/estudiante.model';
import {environment} from '../../environments/environment';
import {Docente} from '../models/docente.model';
import {Usuario} from '../models/usuario.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DocenteService {


  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarDocentes() {

    const url = `${ base_url }/docentes`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, docentes:Docente[] }) => resp.docentes )
      );
  }
  crearDocente( nombre: string  ) {

    const url = `${ base_url }/docentes`;
    return this.http.post( url, nombre, this.headers );
  }

  actualizarDocente( docente: Docente  ) {

    const url = `${ base_url }/docentes/${docente._id }`;
    return this.http.put( url, docente, this.headers );
  }


  borrarDocente( _id: string ) {

    const url = `${ base_url }/docentes/${ _id }`;
    return this.http.delete( url, this.headers );
  }
  obtenerDocentePorId( id: string ) {

    const url = `${ base_url }/docentes/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, docente: Docente }) => resp.docente )
      );
  }
  guardarDocente( docente: Docente ) {

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // };

    return this.http.put(`${ base_url }/docentes/${ docente._id }`, docente, this.headers);

  }
}
