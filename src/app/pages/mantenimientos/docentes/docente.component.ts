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
import {Docente} from '../../../models/docente.model';
import {DocenteService} from '../../../services/docente.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styles: [
  ]
})
export class DocenteComponent implements OnInit {

  public docenteForm: FormGroup;
  public docentes: Docente[] = [];

  public docenteSeleccionado: Docente;
  // public hospitalSeleccionado: Hospital;



  constructor( private fb: FormBuilder,
               private docenteService: DocenteService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => this.cargarDocente( id ) );

    this.docenteForm = this.fb.group({
      nombre: ['', Validators.required ],
      titulo: ['', Validators.required ],
      facultad: ['', Validators.required ],
      escuela: ['', Validators.required ],
      categoria: ['', Validators.required ],
      rold: ['', Validators.required ],


      // hospital: ['', Validators.required ],
    });

    // this.cargarHospitales();

    // this.estudianteForm.get('estudiante').valueChanges
    //   .subscribe( hospitalId => {
    //     this.estudianteSeleccionado = this.estudiantes.find( h => h._id === hospitalId );
    //   })
  }

  cargarDocente(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.docenteService.obtenerDocentePorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( docente => {

        if ( !docente ) {
          return this.router.navigateByUrl(`/dashboard/docentes`);
        }

        const { nombre,titulo,facultad,escuela,categoria,rold,img } = docente;
        this.docenteSeleccionado = docente;
        this.docenteForm.setValue({ nombre,titulo,facultad,escuela,categoria,rold,img });
      });

  }



  guardarDocente() {

    const { nombre,titulo,faculta,escuela,categoria,rold,img} = this.docenteForm.value;

    if ( this.docenteSeleccionado ) {
      // actualizar
      const data = {
        ...this.docenteForm.value,
        _id: this.docenteSeleccionado._id
      }
      this.docenteService.actualizarDocente( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear

      this.docenteService.crearDocente(this.docenteForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/docente/${ resp.docente._id }`)
        })
    }



  }

}
