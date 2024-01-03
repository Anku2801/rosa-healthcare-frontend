import { Routes } from '@angular/router';

import { DashboardComponent } from '../../doctorpanel/dashboard/dashboard.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
import { DoctorComponent } from '../../adminpanel/doctor/doctor.component';
import { UserComponent } from '../../adminpanel/user/user.component';
import { PrescriptionComponent } from '../../adminpanel/user/prescription.component';
import { AddPrescriptionComponent } from '../../adminpanel/user/add-prescription.component';
import { SettingComponent } from '../../adminpanel/dashboard/setting.component';
import { AuthGuard } from 'app/commonconfig/service/auth.guard';
import { LogoutComponent } from '../../login/logout.component';

export const DoctorLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent,          canActivate: [AuthGuard]},
    { path: 'view-appointments',    component: ViewAppointmentComponent,    canActivate: [AuthGuard]},
    { path: 'patients',             component: UserComponent,               canActivate: [AuthGuard]},
    { path: 'prescriptions/:id',    component: PrescriptionComponent,       canActivate: [AuthGuard]},
    { path: 'add-prescription',     component: AddPrescriptionComponent,    canActivate: [AuthGuard]},
    { path: 'doctors',              component: DoctorComponent,             canActivate: [AuthGuard]},
    { path: 'settings',             component: SettingComponent,            canActivate: [AuthGuard]},
    { path: 'logout',               component: LogoutComponent,             canActivate: [AuthGuard]}
];
