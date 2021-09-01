import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentesComponent } from './docentes.component';
import {PerfilComponent} from '../../perfil/perfil.component';
import {UsuarioService} from '../../../services/usuario.service';
import {FormBuilder} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {FileUploadService} from '../../../services/file-upload.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {DocenteService} from '../../../services/docente.service';


describe('DocentesComponent', () => {
  let component: DocentesComponent;
  let fixture: ComponentFixture<DocentesComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[DocentesComponent],
      providers:[DocenteService],
      imports:[HttpClientModule]

    })
    fixture=TestBed.createComponent(DocentesComponent);
    component=fixture.componentInstance;
  })

  it('Debe de crearse el componente docente', () => {

    expect(component).toBeTruthy()

  });
});
