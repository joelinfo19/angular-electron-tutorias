import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesComponent } from './estudiantes.component';
import {DocentesComponent} from '../docentes/docentes.component';
import {DocenteService} from '../../../services/docente.service';
import {HttpClientModule} from '@angular/common/http';
import {EstudianteService} from '../../../services/estudiante.service';

describe('EstudiantesComponent', () => {
  let component: EstudiantesComponent;
  let fixture: ComponentFixture<EstudiantesComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[EstudiantesComponent],
      providers:[EstudianteService],
      imports:[HttpClientModule]

    })
    fixture=TestBed.createComponent(EstudiantesComponent);
    component=fixture.componentInstance;
  })

  it('Debe de crearse el componente estudiante', () => {

    expect(component).toBeTruthy()

  });
});
