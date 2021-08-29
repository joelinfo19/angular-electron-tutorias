import {environment} from '../../environments/environment'
//implement base_ulr in environments
const base_url=environment.base_url
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE'|'USER_ROLE',
    public _id?: string,
  ){}
  get imagenUrl()
  {
    if(!this.img){
      return `${base_url}/upload/usuarios/no-image`
    }else if(this.img && this.img.includes('https')){
      return this.img
    }else if(this.img){
      return `${base_url}/upload/usuarios/${this.img}`
    }else{
      return `${base_url}/upload/usuarios/no-image`
    }
    // if (this.img) {
    //   if (this.img.includes('https')){ return this.img; }
    //   return `${base_url}/upload/usuarios/${this.img}`
    // } else {
    //   return `${base_url}/upload/usuarios/no-image`
    // }
    // if ( !this.img ) {
    //   return `${ base_url }/upload/usuarios/no-image`;
    // } else if ( this.img.includes('https') ) {
    //   return this.img;
    // } else if ( this.img ) {
    //   return `${ base_url }/upload/usuarios/${ this.img }`;
    // } else {
    //   return `${ base_url }/upload/usuarios/no-image`;
    // }
  }
}
