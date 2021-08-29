import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NopagefoundComponent} from './pages/nopagefound/nopagefound.component';
import {PagesRoutingModule} from './pages/pages.routing';
import {AuthRoutingModule} from './auth/auth.routing';

const routes: Routes = [




  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

  {path: '**', component: NopagefoundComponent},

  // {path:'',redirectTo:'/dashboard',pathMatch:'full'},


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
