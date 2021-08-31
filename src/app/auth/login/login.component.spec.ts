import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {UsuarioService} from '../../services/usuario.service';
import {FormBuilder} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
 // const servicio=new UsuarioService(null,null,undefined);

  //let fixture: ComponentFixture<LoginComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ LoginComponent ]
  //   })
  //   .compileComponents();
  // });
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(()=>{
    component=new LoginComponent(null,new FormBuilder(),null,undefined)
  })

  it('Login formulario debe crear un formulario con 3 campos', () => {
    expect(component.loginForm.contains("email")).toBeTruthy();
    expect(component.loginForm.contains("password")).toBeTruthy();
    expect(component.loginForm.contains("remember")).toBeTruthy();

  });
});
