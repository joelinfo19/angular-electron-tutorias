import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {BusquedasService} from '../../services/busquedas.service'
import {Usuario} from '../../models/usuario.model'
import {Estudiante} from '../../models/estudiante.model'
import {Docente} from '../../models/docente.model'
import {Tutoria} from '../../models/tutoria.model'

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuarios:Usuario[]=[]
  public estudiantes:Estudiante[]=[]
  public docentes:Docente[]=[]
  public tutorias:Tutoria[]=[]

  constructor(private activatedRoute:ActivatedRoute,private busquedaService:BusquedasService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({termino})=>this.busquedaGlobal(termino))
  }
  busquedaGlobal(termino:string){
    this.busquedaService.busquedaGlobal(termino)
      .subscribe((resp:any)=>{
        console.log(resp)
        this.usuarios=resp.usuarios
        this.estudiantes=resp.estudiantes
        this.docentes=resp.docentes
        this.tutorias=resp.tutorias


      })

  }


}
