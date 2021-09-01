import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ DashboardComponent ]
  //   })
  //   .compileComponents();
  // });
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DashboardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[DashboardComponent],
      imports:[FormsModule]
    })
    fixture=TestBed.createComponent(DashboardComponent)
    component=fixture.componentInstance
  })

  it('Debe de mostrar la leyenda', () => {
    component.leyenda='Progreso de carga'
    fixture.detectChanges() // Dispara la deteccion de cambios
    const elem:HTMLElement=fixture.debugElement.query(By.css('h3')).nativeElement
    expect(elem.innerHTML).toContain('Progreso de carga')
  });
  it('DEbe de incremeentar/decrementar en 5,con un click en el boton', () => {
    const botones =fixture.debugElement.queryAll(By.css('.btn-primary'))

    botones[0].triggerEventHandler('click',null)
    expect(component.progreso).toBe(45)
    //si boton no existe sera error
    botones[1].triggerEventHandler('click',null)
    expect(component.progreso).toBe(50)

  });
  it('En el titulo del componente debe de mostrar el progress', () => {
    const botones =fixture.debugElement.queryAll(By.css('.btn-primary'))

    botones[0].triggerEventHandler('click',null)
    fixture.detectChanges()
    //si boton no existe sera error
    const elem:HTMLElement=fixture.debugElement.query(By.css('h3')).nativeElement
    expect(elem.innerHTML).toContain('45')

  });
});
