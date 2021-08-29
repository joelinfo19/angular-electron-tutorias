import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Estudiante} from '../models/estudiante.model';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

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


  cargarEstudiantes() {

    const url = `${ base_url }/estudiantes`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, estudiantes: Estudiante[] }) => resp.estudiantes )
      );
  }
  crearEstudiante( nombre: string  ) {

    const url = `${ base_url }/estudiantes`;
    return this.http.post( url, nombre, this.headers );
  }

  actualizarEstudiante( estudiante: Estudiante  ) {

    const url = `${ base_url }/estudiantes/${ estudiante._id }`;
    return this.http.put( url, estudiante, this.headers );
  }


  borrarEstudiante( _id: string ) {

    const url = `${ base_url }/estudiantes/${ _id }`;
    return this.http.delete( url, this.headers );
  }
  obtenerEstudiantePorId( id: string ) {

    const url = `${ base_url }/estudiantes/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, estudiante: Estudiante }) => resp.estudiante )
      );
  }
}
