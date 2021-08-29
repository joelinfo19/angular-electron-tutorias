import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted=false


  public registerForm=this.fb.group({
    nombre:['Fernando',Validators.required],
    email:['test@gmail.com',[Validators.required,Validators.email]],
    password:['123456',Validators.required],
    password2:['123456',Validators.required],
    terminos:[true,Validators.required],

  },{
    validators:this.passwordsIguales('password','password2')
  })

  constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private router:Router) { }

  ngOnInit(): void {
  }
  crearUsuario(){
    this.formSubmitted=true
    console.log(this.registerForm.value)
    if(this.registerForm.invalid){
      return
    }
    //realizar el posteo

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/')
      },(err) => {
        Swal.fire('Error',err.error.msg,'error')
      } )
  }
  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo).invalid && this.formSubmitted){
      return true
    }else{
      return false

    }
  }
  contrasenasNoValidas(){
    const pass1=this.registerForm.get('password').value
    const pass2=this.registerForm.get('password2').value
    if(pass1!==pass2 && this.formSubmitted){
      return true
    }else {
      return false
    }
  }
  passwordsIguales(pass1Name:string,pass2Name:string){

    return (formGroup:FormGroup)=>{
      const pass1Control=formGroup.get(pass1Name)
      const pass2Control=formGroup.get(pass2Name)

      if(pass1Control.value===pass2Control.value){
        pass2Control.setErrors(null)
      }
      else{
        pass2Control.setErrors({noEsIgual:true})
      }



    }
  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted
  }

}
