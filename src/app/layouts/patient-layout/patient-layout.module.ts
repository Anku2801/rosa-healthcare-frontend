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

import { PatientLayoutRoutes } from './patient-layout.routing';

import { DashboardComponent } from '../../patientpanel/dashboard/dashboard.component';
import { ChatComponent } from '../../patientpanel/chat/chat.component';
import { PrescriptionComponent } from '../../patientpanel/prescription/prescription.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientLayoutRoutes),
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
    ChatComponent,
    PrescriptionComponent
  ]
})

export class PatientLayoutModule {}
