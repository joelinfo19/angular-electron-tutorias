import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesComponent} from './pages.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import {ComponentsModule} from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { DocentesComponent } from './mantenimientos/docentes/docentes.component';
import { TutoriasComponent } from './mantenimientos/tutorias/tutorias.component';
import {PipesModule} from '../pipes/pipes.module';
import {EstudianteComponent} from './mantenimientos/estudiantes/estudiante.component';
import {DocenteComponent} from './mantenimientos/docentes/docente.component';
import {TutoriaComponent} from './mantenimientos/tutorias/tutoria.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsuariosComponent,
    PerfilComponent,
    AccountSettingsComponent,
    EstudiantesComponent,
    DocentesComponent,
    DocenteComponent,
    TutoriasComponent,
    EstudianteComponent,
    TutoriaComponent

  ],
  exports: [
    DashboardComponent,
    PagesComponent

  ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ComponentsModule,
        FormsModule,
        PipesModule,
        NgbModule

    ]
})
export class PagesModule { }
