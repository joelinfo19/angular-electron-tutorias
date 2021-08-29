import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {UsuarioService} from '../../services/usuario.service'
import {Usuario} from '../../models/usuario.model'
import {FileUploadService} from '../../services/file-upload.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup
  public usuario:Usuario
  public imagenSubir:File
  public imgTemp:any=null
  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService) {
    this.usuario=usuarioService.usuario


  }

  ngOnInit(): void {
    this.perfilForm=this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]],

    })


  }
  //TODO _id is uid we have to check the backend and json web token
  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp=>{
        const {nombre,email}=this.perfilForm.value
        this.usuario.nombre=nombre
        this.usuario.email=email
        Swal.fire('GUARDADO','Cambios fueron guardos','success')
      },(err)=>{
        Swal.fire('No se pudo actualizar',err.error.msg,'error')
        console.log(err.error.msg)
      })
  }
  cambiarImagen(file:File){
    this.imagenSubir=file
    if( !file){
      return this.imgTemp=null
    }
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      this.imgTemp=reader.result
      console.log(reader.result)
    }
  }
  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario._id)
      .then(img=> {
        this.usuario.img = img
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success')
      }).catch(err=>{
      console.log(err)
      Swal.fire('Error','No se pudo subir la imagen','error')
    })
  }

}
