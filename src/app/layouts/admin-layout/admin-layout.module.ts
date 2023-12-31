import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from "@angular/material/button-toggle"; 
import { DataTablesModule } from "angular-datatables";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../adminpanel/dashboard/dashboard.component';
import { UserComponent } from '../../adminpanel/user/user.component';
import { AddUserComponent } from '../../adminpanel/user/add-user.component';
import { PrescriptionComponent } from '../../adminpanel/user/prescription.component';
import { AddPrescriptionComponent } from '../../adminpanel/user/add-prescription.component';
import { DoctorComponent } from '../../adminpanel/doctor/doctor.component';
import { AddDoctorComponent } from '../../adminpanel/doctor/add-doctor.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
import { BookAppointmentComponent } from '../../adminpanel/booked-appointment/book-appointment.component';
import { AddStaffComponent } from '../../adminpanel/staff/add-staff.component';
import { StaffComponent } from '../../adminpanel/staff/staff.component';
import { SettingComponent } from '../../adminpanel/dashboard/setting.component';
import { TestComponent } from '../../adminpanel/dashboard/testing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    DatePipe,
    DataTablesModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    AddUserComponent,
    PrescriptionComponent,
    AddPrescriptionComponent,
    DoctorComponent,
    AddDoctorComponent,
    ViewAppointmentComponent,
    BookAppointmentComponent,
    AddStaffComponent,
    StaffComponent,
    SettingComponent,
    TestComponent
  ]
})

export class AdminLayoutModule {}
