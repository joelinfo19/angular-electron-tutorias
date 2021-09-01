import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriasComponent } from './tutorias.component';
import {EstudiantesComponent} from '../estudiantes/estudiantes.component';
import {EstudianteService} from '../../../services/estudiante.service';
import {HttpClientModule} from '@angular/common/http';
import {TutoriaService} from '../../../services/tutoria.service';

describe('TutoriasComponent', () => {
  let component: TutoriasComponent;
  let fixture: ComponentFixture<TutoriasComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[TutoriasComponent],
      providers:[TutoriaService],
      imports:[HttpClientModule]

    })
    fixture=TestBed.createComponent(TutoriasComponent);
    component=fixture.componentInstance;
  })

  it('Debe de crearse el componente tutorias', () => {

    expect(component).toBeTruthy()

  });
});
