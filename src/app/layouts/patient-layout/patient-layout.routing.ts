import { Routes } from '@angular/router';

import { DashboardComponent } from '../../patientpanel/dashboard/dashboard.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
import { ChatComponent } from '../../patientpanel/chat/chat.component';
import { PrescriptionComponent } from '../../patientpanel/prescription/prescription.component';
import { SettingComponent } from '../../adminpanel/dashboard/setting.component';
import { LogoutComponent } from '../../login/logout.component';

export const PatientLayoutRoutes: Routes = [
    { path: 'dashboard',         component: DashboardComponent },
    { path: 'view-appointments', component: ViewAppointmentComponent },
    { path: 'prescriptions',     component: PrescriptionComponent },
    { path: 'chat',              component: ChatComponent },
    { path: 'settings',          component: SettingComponent},
    { path: 'logout',            component: LogoutComponent}
];
