import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from "@angular/material/button-toggle"; 
import { DataTablesModule } from "angular-datatables";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";

import { DoctorLayoutRoutes } from './doctor-layout.routing';

import { DashboardComponent } from '../../doctorpanel/dashboard/dashboard.component';
// import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
// import { BookAppointmentComponent } from '../../adminpanel/booked-appointment/book-appointment.component';
// import { UserComponent } from '../../adminpanel/user/user.component';
// import { AddUserComponent } from '../../adminpanel/user/add-user.component';
// import { DoctorComponent } from '../../adminpanel/doctor/doctor.component';
// import { AddDoctorComponent } from '../../adminpanel/doctor/add-doctor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DoctorLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    DataTablesModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    // ViewAppointmentComponent,
    // BookAppointmentComponent
    // UserComponent,
    // AddUserComponent,
    // DoctorComponent,
    // AddDoctorComponent,
  ]
})

export class DoctorLayoutModule {}
