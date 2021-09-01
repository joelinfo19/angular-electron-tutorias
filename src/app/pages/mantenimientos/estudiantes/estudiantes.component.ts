import {Component, OnDestroy, OnInit} from '@angular/core';
import {Estudiante} from '../../../models/estudiante.model';
import {EstudianteService} from '../../../services/estudiante.service';
import {ModalImagenService} from '../../../services/modal-imagen.service';
import {BusquedasService} from '../../../services/busquedas.service';
import {Usuario} from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import {delay} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public totalEstudiantes:number=0

  public desde:number=0
  public estudiantes: Estudiante[] = [];
  private imgSubs: Subscription;
  constructor(private estudianteService: EstudianteService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  ngOnInit(): void {
    this.cargarEstudiantes();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarEstudiantes() );
  }
  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarEstudiantes();
    }

    this.busquedasService.buscar( 'estudiantes', termino )
      .subscribe( resp => {

        this.estudiantes = resp;

      });
  }
  abrirModal(estudiante: Estudiante) {

    this.modalImagenService.abrirModal( 'estudiantes', estudiante._id, estudiante.img );

  }
  cargarEstudiantes() {

    this.cargando = true;
    this.estudianteService.cargarEstudiantes()
      .subscribe( estudiantes => {
        this.cargando = false;
        this.estudiantes = estudiantes;
      })
  }
  eliminarEstudiante(estudiante:Estudiante){


    Swal.fire({
      title: 'Borrar Estudiante?',
      text: `Esta a punto de borrar a ${estudiante.nombre}`,
      icon: 'question',
      showCancelButton: true,

      confirmButtonText: 'Si,borrarlo'
    }).then((result) => {
      if (result.value) {
        this.estudianteService.borrarEstudiante(estudiante._id)
          .subscribe(resp=>{
            this.cargarEstudiantes()
            Swal.fire(
              'Estudiante borraro',
              `${estudiante.nombre} fue eliminado correctamente`,
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
    }else if(this.desde>=this.totalEstudiantes){
      this.desde-=valor

    }
    this.cargarEstudiantes()
  }
  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear estudiante',
      text: 'Ingrese el nombre del nuevo estudiante',
      input: 'text',
      inputPlaceholder: 'Nombre del estudiante',
      showCancelButton: true,
    });


    if( value.trim().length > 0 ) {
      this.estudianteService.crearEstudiante( value )
        .subscribe( (resp: any) => {
          this.estudiantes.push( resp.estudiante )
        })
    }
  }
}
