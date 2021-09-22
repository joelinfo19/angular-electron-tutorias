import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteComponent } from './docente.component';
import {PerfilComponent} from '../../perfil/perfil.component';
import {UsuarioService} from '../../../services/usuario.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FileUploadService} from '../../../services/file-upload.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {DocenteService} from '../../../services/docente.service';
import {Observable, Subject} from 'rxjs';
class FakeRouter{
  navigate(params){}
}
class FakeActivatedRoute{
  // params:Observable<any>=Observable.empty()
  private subsject=new Subject();
}
xdescribe('DocentesComponent', () => {
  let component: DocenteComponent;
  let fixture: ComponentFixture<DocenteComponent>;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[DocenteComponent],
      providers:[{provide:Router,useClass:FakeRouter},
                  {provide:ActivatedRoute,useClass:FakeActivatedRoute}],


    })
    fixture=TestBed.createComponent(DocenteComponent);
    component=fixture.componentInstance;
  })

  it('Debe de crearse el componente docente', () => {

    expect(component).toBeTruthy()

  });
});
