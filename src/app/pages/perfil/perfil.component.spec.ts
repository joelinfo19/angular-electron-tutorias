import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import {UsuarioService} from '../../services/usuario.service';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileUploadService} from '../../services/file-upload.service';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {from, Observable} from 'rxjs';

// import 'rxjs/add/observable/empty';
import {RegisterComponent} from '../../auth/register/register.component';
// class FakeBuilder{
//   group(params){
//
//   }
// }
// class FakeActivatedRoute{
//   params:Observable<any>=Observable.empty()
// }

xdescribe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[PerfilComponent],
      providers:[UsuarioService,FormBuilder,Router,FileUploadService],
      imports:[HttpClientModule,RouterTestingModule,RouterModule]

    })
    fixture=TestBed.createComponent(PerfilComponent);
    component=fixture.componentInstance;
  })

  it('Debe de crear un formulario', () => {

      expect(component).toBeTruthy()

  });
});
