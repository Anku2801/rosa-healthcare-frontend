import { Routes } from '@angular/router';

import { DashboardComponent } from '../../doctorpanel/dashboard/dashboard.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
import { DoctorComponent } from '../../adminpanel/doctor/doctor.component';
import { UserComponent } from '../../adminpanel/user/user.component';
import { SettingComponent } from '../../adminpanel/dashboard/setting.component';
import { LogoutComponent } from '../../login/logout.component';

export const DoctorLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'view-appointments',    component: ViewAppointmentComponent },
    { path: 'patients',             component: UserComponent },
    { path: 'doctors',              component: DoctorComponent },
    { path: 'settings',             component: SettingComponent},
    { path: 'logout',               component: LogoutComponent}
];
