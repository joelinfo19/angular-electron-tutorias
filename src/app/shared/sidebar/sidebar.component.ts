import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {UsuarioService} from '../../services/usuario.service';
import {SidebarService} from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
  background: transparent;
}`]
})
export class SidebarComponent implements OnInit {
  public usuario:Usuario
  public menuItems:any[]
  constructor(public sidebarService:SidebarService,private usuarioService:UsuarioService) {
    // this.menuItems=sidebarService.menu
    this.usuario= usuarioService.usuario


  }

  ngOnInit(): void {
    //  this.imgUrl=usuarioService.usuario.imagenUrl
    //   this.imgUrl = this.usuarioService.usuario?.imagenUrl ;

  }

}
