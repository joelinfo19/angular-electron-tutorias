import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {UsuarioService} from '../../services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario:Usuario


  constructor(private usuarioService:UsuarioService,private router:Router) {
    this.usuario=usuarioService.usuario

  }

  ngOnInit(): void {
    // this.imgUrl = this.usuarioService.usuario?.imagenUrl ;

  }
  logout(){
    this.usuarioService.logout()

  }
  buscar(termino:string){
    if(termino.length===0){
      this.router.navigateByUrl('/dashboard')
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}
