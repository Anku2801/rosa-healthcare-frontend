import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatButtonToggleModule } from "@angular/material/button-toggle"; 
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { AdminSidebarModule } from './adminpanel/admin-sidebar/admin-sidebar.module';
import { DoctorSidebarModule } from './doctorpanel/doctor-sidebar/doctor-sidebar.module';
import { PatientSidebarModule } from './patientpanel/patient-sidebar/patient-sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    DataTablesModule,
    CarouselModule,
    NgxSpinnerModule,
    NavbarModule,
    FooterModule,
    AdminSidebarModule,
    DoctorSidebarModule,
    PatientSidebarModule,
    AppRoutingModule,
    MatButtonToggleModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DoctorLayoutComponent,
    PatientLayoutComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
