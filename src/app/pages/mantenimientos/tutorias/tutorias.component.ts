import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Tutoria} from '../../../models/tutoria.model';
import {TutoriaService} from '../../../services/tutoria.service';
import {ModalImagenService} from '../../../services/modal-imagen.service';
import {BusquedasService} from '../../../services/busquedas.service';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Docente} from '../../../models/docente.model';
import {Estudiante} from '../../../models/estudiante.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tutorias',
  templateUrl: './tutorias.component.html',
  styleUrls: ['./tutorias.component.css']
})
export class TutoriasComponent implements OnInit {

  public cargando: boolean = true;
  public tutorias: Tutoria[] = [];
  private imgSubs: Subscription;
  public docentes: Docente[] = [];
  public estudiantes: Estudiante[] = [];
  public docente:Docente;
  public estudiante:Estudiante;
  constructor( private tutoriaService: TutoriaService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    // this.estudiante.nombre='';
    // this.docente.nombre='';

    this.cargarTutorias();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarTutorias() );
  }

  cargarTutorias() {
    this.cargando = true;
    this.tutoriaService.cargarTutorias()
      .subscribe( tutorias => {
        this.cargando = false;
        this.tutorias = tutorias;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarTutorias();
    }

    this.busquedasService.buscar( 'tutorias', termino )
      .subscribe( resp => {
        this.tutorias = resp;
      });
  }

  // abrirModal(tutoria: Tutoria) {
  //
  //   this.modalImagenService.abrirModal( 'tutorias', tutoria._id, tutoria.img );
  //
  // }

  borrarTutoria( tutoria: Tutoria ) {

    Swal.fire({
      title: '¿Borrar tutoria?',
      text: `Esta a punto de borrar a tutoria ${ tutoria.codigo }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.tutoriaService.borrarTutoria( tutoria._id )
          .subscribe( resp => {

            this.cargarTutorias();
            Swal.fire(
              'Tutoria borrada',
              `${ tutoria.codigo } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }



}
