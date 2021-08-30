import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Docente} from '../../../models/docente.model';
import {Tutoria} from '../../../models/tutoria.model';
import {DocenteService} from '../../../services/docente.service';
import {TutoriaService} from '../../../services/tutoria.service';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {Estudiante} from '../../../models/estudiante.model';
import {EstudianteService} from '../../../services/estudiante.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tutoria',
  templateUrl: './tutoria.component.html',
})
export class TutoriaComponent implements OnInit {
  public tutoriaForm: FormGroup;
  public docentes: Docente[] = [];
  public estudiantes: Estudiante[] = [];
  model: NgbDateStruct;
  public tutoriaSeleccionado: Tutoria;
  public docenteSeleccionado: Docente;
  public estudianteSeleccionado: Estudiante;



  constructor( private fb: FormBuilder,
               private docenteService: DocenteService,
               private tutoriaService: TutoriaService,
               private estudianteService:EstudianteService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => this.cargarTutoria( id ) );

    this.tutoriaForm = this.fb.group({
      direccion: ['', Validators.required ],
      codigo: ['', Validators.required ],
      fecha: ['', Validators.required ],
      tipoTutoria: ['', Validators.required ],
      descripcion: ['', Validators.required ],
      estudiante: ['', Validators.required ],
      docente: ['', Validators.required ],

    });

    this.cargarDocentes();
    this.cargarEstudiantes()
    this.tutoriaForm.get('docente').valueChanges
      .subscribe( docenteId => {
        this.docenteSeleccionado = this.docentes.find( h => h._id === docenteId );
      })
    this.tutoriaForm.get('estudiante').valueChanges
      .subscribe( estudianteId => {
        this.estudianteSeleccionado = this.estudiantes.find( h => h._id === estudianteId );
      })
  }

  cargarTutoria(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.tutoriaService.obtenerTutoriaPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( tutoria => {

        if ( !tutoria ) {
          return this.router.navigateByUrl(`/dashboard/tutorias`);
        }
    //    const estudiante:Estudiante
     //   const __id=estudiante._id

        const { direccion,codigo,fecha,tipoTutoria,descripcion,estudiante,docente} = tutoria;

        console.log(tutoria)

        this.tutoriaSeleccionado = tutoria;
        this.tutoriaForm.setValue({ direccion,codigo,fecha,tipoTutoria,descripcion,estudiante, docente });
      });

  }

  cargarDocentes() {

    this.docenteService.cargarDocentes()
      .subscribe( (docentes: Docente[]) => {
        this.docentes = docentes;
      })

  }
  cargarEstudiantes() {

    this.estudianteService.cargarEstudiantes()
      .subscribe( (estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
      })

  }

  guardarTutoria() {

    const { direccion } = this.tutoriaForm.value;

    if ( this.tutoriaSeleccionado ) {
      // actualizar
      const data = {
        ...this.tutoriaForm.value,
        _id: this.tutoriaSeleccionado._id
      }
      this.tutoriaService.actualizarTutoria( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ direccion } actualizado correctamente`, 'success');
        })

    } else {
      // crear

      this.tutoriaService.crearTutoria( this.tutoriaForm.value )
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ direccion } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/tutoria/${ resp.tutoria._id }`)
        })
    }



  }

}
