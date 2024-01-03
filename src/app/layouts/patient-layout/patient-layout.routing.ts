import { Routes } from '@angular/router';
import { AuthGuard } from 'app/commonconfig/service/auth.guard';

import { DashboardComponent } from '../../patientpanel/dashboard/dashboard.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
import { BookAppointmentComponent } from '../../adminpanel/booked-appointment/book-appointment.component';
import { ChatComponent } from '../../patientpanel/chat/chat.component';
import { PrescriptionComponent } from '../../patientpanel/prescription/prescription.component';
import { SettingComponent } from '../../adminpanel/dashboard/setting.component';

export const PatientLayoutRoutes: Routes = [
    { path: 'dashboard',         component: DashboardComponent,         canActivate: [AuthGuard]},
    { path: 'view-appointments', component: ViewAppointmentComponent,   canActivate: [AuthGuard]},
    { path: 'book-appointment',  component: BookAppointmentComponent,   canActivate: [AuthGuard]},
    { path: 'prescriptions',     component: PrescriptionComponent,      canActivate: [AuthGuard]},
    { path: 'chat',              component: ChatComponent,              canActivate: [AuthGuard]},
    { path: 'settings',          component: SettingComponent,           canActivate: [AuthGuard]}
];
