import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsuariosComponent} from './mantenimientos/usuarios/usuarios.component';

import {AdminGuard} from '../guards/admin.guard'
import {PerfilComponent} from './perfil/perfil.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {EstudiantesComponent} from './mantenimientos/estudiantes/estudiantes.component';
import {DocentesComponent} from './mantenimientos/docentes/docentes.component';
import {EstudianteComponent} from './mantenimientos/estudiantes/estudiante.component';


const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  // {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'}},
  // {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
  // {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
  // {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesass'}},
  // {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
  {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'}},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  // mantenimientos
  { path: 'estudiantes', component: EstudiantesComponent, data: { titulo: 'Matenimiento de Estudiantes' }},
  { path: 'docentes', component: DocentesComponent, data: { titulo: 'Matenimiento de Docentes' }},
  // { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' }},


  // Rutas de admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
  { path: 'estudiante/:id', component: EstudianteComponent, data: { titulo: 'Matenimiento de Estudiantes' }},


];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
