import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario.model';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Estudiante} from '../models/estudiante.model';
import {Docente} from '../models/docente.model';
import {Tutoria} from '../models/tutoria.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) {

  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    };
  }
  private transformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user._id)
    );


  }
  private transformarEstudiantes( resultados: any[] ): Estudiante[] {
    return resultados;
  }
  //
  private transformarDocentes( resultados: any[] ): Docente[] {
    return resultados;
  }
  private transformarTutorias( resultados: any[] ): Tutoria[] {
    return resultados;
  }
  busquedaGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers);
  }
  buscar(tipo: 'usuarios'|'estudiantes'|'docentes'|'tutorias',
         termino: string){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch ( tipo ) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultados );

            case 'estudiantes':
              return this.transformarEstudiantes( resp.resultados );

            case 'docentes':
              return this.transformarDocentes( resp.resultados );
            case 'tutorias':
              return this.transformarTutorias( resp.resultados );

            default:
              return [];
          }
        })
      );
  }
}
