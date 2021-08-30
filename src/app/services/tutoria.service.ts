import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Tutoria} from '../models/tutoria.model'
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TutoriaService {


  constructor( private http: HttpClient) { }


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


  cargarTutorias() {

    const url = `${ base_url }/tutorias`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, tutorias: Tutoria[] }) => resp.tutorias )
      );
  }

  obtenerTutoriaPorId( id: string ) {

    const url = `${ base_url }/tutorias/${ id }`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, tutoria: Tutoria }) => resp.tutoria )
      );
  }

  crearTutoria( tutoria: { direccion: string, codigo:string,fecha:Object,tipoTutoria:string,descripcion:string,estudiante: string,docente:string } ) {

    const url = `${ base_url }/tutorias`;
    return this.http.post( url, tutoria, this.headers );
  }

  actualizarTutoria( tutoria: Tutoria  ) {

    const url = `${ base_url }/tutorias/${ tutoria._id }`;
    return this.http.put( url, tutoria, this.headers );
  }

  borrarTutoria( _id: string ) {

    const url = `${ base_url }/tutorias/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
