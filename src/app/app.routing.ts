import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", redirectTo: 'home' },
  { path: "doctor", redirectTo: 'home' },
  { path: "doctor", redirectTo: 'home' },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
  }]},
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/doctor-layout/doctor-layout.module').then(x => x.DoctorLayoutModule)
  }]},
  {
    path: 'patient',
    component: PatientLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/patient-layout/patient-layout.module').then(x => x.PatientLayoutModule)
  }]},
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
