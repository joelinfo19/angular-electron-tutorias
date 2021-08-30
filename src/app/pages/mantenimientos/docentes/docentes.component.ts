import { Component, OnInit } from '@angular/core';
import {Estudiante} from '../../../models/estudiante.model';
import {Subscription} from 'rxjs';
import {EstudianteService} from '../../../services/estudiante.service';
import {ModalImagenService} from '../../../services/modal-imagen.service';
import {BusquedasService} from '../../../services/busquedas.service';
import {delay} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Docente} from '../../../models/docente.model';
import {DocenteService} from '../../../services/docente.service';
import {Usuario} from '../../../models/usuario.model';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  public cargando: boolean = true;
  public totalUsuarios:number=0
  public desde:number=0
  public docentes:Docente[] = [];
  private imgSubs: Subscription;
  constructor(private docenteService:DocenteService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  ngOnInit(): void {
    this.cargarDocentes();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarDocentes() );
  }
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarDocentes();
    }

    this.busquedasService.buscar( 'docentes', termino )
      .subscribe( resp => {

        this.docentes = resp;

      });
  }
  abrirModal(docente:Docente) {

    this.modalImagenService.abrirModal( 'docentes', docente._id, docente.img );

  }
  cargarDocentes() {

    this.cargando = true;
    this.docenteService.cargarDocentes()
      .subscribe( docentes => {
        this.cargando = false;
        this.docentes = docentes;
      })

  }
  eliminarDocente(docente:Docente){


    Swal.fire({
      title: 'Borrar Docente?',
      text: `Esta a punto de borrar a ${docente.nombre}`,
      icon: 'question',
      showCancelButton: true,

      confirmButtonText: 'Si,borrarlo'
    }).then((result) => {
      if (result.value) {
        this.docenteService.borrarDocente(docente._id)
          .subscribe(resp=>{
            this.cargarDocentes()
            Swal.fire(
              'Docente borrado',
              `${docente.nombre} fue eliminado correctamente`,
              'success'
            )


          })
      }
    })

  }
  cambiarPagina(valor:number){
    this.desde+=valor
    if(this.desde<0){
      this.desde=0
    }else if(this.desde>=this.totalUsuarios){
      this.desde-=valor

    }
    this.cargarDocentes()
  }
  cambiarRole(docente:Docente){
    this.docenteService.guardarDocente(docente)
      .subscribe(resp=>{
        console.log(resp)
      })
  }

}
