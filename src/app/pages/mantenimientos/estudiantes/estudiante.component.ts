import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
//
// import { Hospital } from '../../../models/hospital.model';
import { Estudiante } from '../../../models/estudiante.model';
//
// import { HospitalService } from '../../../services/hospital.service';
import { EstudianteService } from '../../../services/estudiante.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: [
  ]
})
export class EstudianteComponent implements OnInit {

  public estudianteForm: FormGroup;
  public estudiantes: Estudiante[] = [];

  public estudianteSeleccionado: Estudiante;
  // public hospitalSeleccionado: Hospital;



  constructor( private fb: FormBuilder,
               private estudianteService: EstudianteService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => this.cargarEstudiante( id ) );

    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required ],
      codigo: ['', Validators.required ],
      escuela: ['', Validators.required ],
      codigoEp: ['', Validators.required ],
      anioSemestre: ['', Validators.required ],

      // hospital: ['', Validators.required ],
    });

    // this.cargarHospitales();

    // this.estudianteForm.get('estudiante').valueChanges
    //   .subscribe( hospitalId => {
    //     this.estudianteSeleccionado = this.estudiantes.find( h => h._id === hospitalId );
    //   })
  }

  cargarEstudiante(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.estudianteService.obtenerEstudiantePorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( estudiante => {

        if ( !estudiante ) {
          return this.router.navigateByUrl(`/dashboard/estudiantes`);
        }

        const { nombre,codigo,escuela,codigoEp,anioSemestre,img } = estudiante;
        this.estudianteSeleccionado = estudiante;
        this.estudianteForm.setValue({ nombre,codigo,escuela,codigoEp,anioSemestre,img });
      });

  }



  guardarEstudiante() {

    const { nombre,codigo,escuela,codigoEp,anioSemestre } = this.estudianteForm.value;

    if ( this.estudianteSeleccionado ) {
      // actualizar
      const data = {
        ...this.estudianteForm.value,
        _id: this.estudianteSeleccionado._id
      }
      this.estudianteService.actualizarEstudiante( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear

      this.estudianteService.crearEstudiante(this.estudianteForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/estudiante/${ resp.estudiante._id }`)
        })
    }



  }

}
