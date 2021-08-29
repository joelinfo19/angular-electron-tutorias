import {Injectable, NgZone} from '@angular/core';
import {Usuario} from '../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RegisterForm} from '../interfaces/register-form.interface';

import {LoginForm} from '../interfaces/login-form.interface';
import {CargarUsuario} from '../interfaces/cargar-usuarios.interface';
import {environment} from '../../environments/environment';
import {tap, map, catchError, delay} from 'rxjs/operators'

declare const gapi:any
const base_url=environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get role():'ADMIN_ROLE'|'USER_ROLE'{
    return this.usuario.role
  }

  get uid():string {
    return this.usuario._id || '';
  }
  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }
  guardarLocalStorage(token:string,menu:any){
    localStorage.setItem('token', token );

    localStorage.setItem('menu',JSON.stringify(menu))

  }

  googleInit() {

    return new Promise<void>( (resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '487096518322-mc4novcii0u1oi6a1cfn80as63b7baht.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    //TODO:Borrrar menu
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', _id } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, _id );
        this.guardarLocalStorage(resp.token,resp.menu)
        // console.log(this.usuario._id)

        return true;
      }),
      catchError( error => of(false) )
    );

  }
  crearUsuario( formData: RegisterForm ) {

    return this.http.post(`${ base_url }/usuarios`, formData )
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token,resp.menu)


        })
      )

  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // };
    data={
      ...data,
      role:this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);

  }

  login( formData: LoginForm ) {

    return this.http.post(`${ base_url }/login`, formData )
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token,resp.menu)


        })
      );

  }

  loginGoogle( token ) {

    return this.http.post(`${ base_url }/login/google`, { token } )
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token,resp.menu)


        })
      );

  }
  cargarUsuarios(desde:number=0){
    //localhost:3000/api/usuarios?desde=0
    const url=`${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url,this.headers)
      .pipe(
        map(resp=>{
          const usuarios=resp.usuarios.map(
            user=>new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user._id)
          )
          return {
            total:resp.total,
            usuarios
          }
        })
      )
  }
  eliminarUsuario(usuario:Usuario){
    // /usuarios/fsfsdf
    const url=`${base_url}/usuarios/${usuario._id}`
    return this.http.delete(url,this.headers)

  }
  guardarUsuario( usuario: Usuario ) {

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // };

    return this.http.put(`${ base_url }/usuarios/${ usuario._id }`, usuario, this.headers);

  }
}
