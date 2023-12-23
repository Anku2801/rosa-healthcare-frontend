import { Routes } from '@angular/router';

import { AuthGuard } from 'app/commonconfig/service/auth.guard';
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
import { LogoutComponent } from '../../login/logout.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent},
    { path: 'patients',             component: UserComponent,           canActivate: [AuthGuard]},
    { path: 'add-patient',          component: AddUserComponent,        canActivate: [AuthGuard]},
    { path: 'doctors',              component: DoctorComponent,         canActivate: [AuthGuard]},
    { path: 'add-doctor',           component: AddDoctorComponent,      canActivate: [AuthGuard]},
    { path: 'prescriptions',        component: PrescriptionComponent,   canActivate: [AuthGuard]},
    { path: 'add-prescription',     component: AddPrescriptionComponent,canActivate: [AuthGuard]},
    { path: 'view-appointments',    component: ViewAppointmentComponent,canActivate: [AuthGuard]},
    { path: 'book-appointment',     component: BookAppointmentComponent,canActivate: [AuthGuard]},
    { path: 'add-staff',            component: AddStaffComponent,       canActivate: [AuthGuard]},
    { path: 'all-staff',            component: StaffComponent,          canActivate: [AuthGuard]},
    { path: 'settings',             component: SettingComponent,        canActivate: [AuthGuard]},
    { path: 'logout',               component: LogoutComponent,         canActivate: [AuthGuard]}
];
