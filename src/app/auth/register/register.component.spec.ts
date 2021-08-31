import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {FormBuilder} from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  beforeEach(()=>{
    component=new RegisterComponent(new FormBuilder(),null,null)
  })
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ RegisterComponent ]
  //   })
  //   .compileComponents();
  // });
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(RegisterComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('Debe de crear un formulario', () => {
    expect(component.registerForm.contains('nombre')).toBeTruthy();
  });
});
