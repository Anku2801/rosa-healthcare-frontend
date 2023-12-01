import { Routes } from '@angular/router';

import { DashboardComponent } from '../../adminpanel/dashboard/dashboard.component';
import { UserComponent } from '../../adminpanel/user/user.component';
import { AddUserComponent } from '../../adminpanel/user/add-user.component';
import { DoctorComponent } from '../../adminpanel/doctor/doctor.component';
import { AddDoctorComponent } from '../../adminpanel/doctor/add-doctor.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
import { BookAppointmentComponent } from '../../adminpanel/booked-appointment/book-appointment.component';
import { AddStaffComponent } from '../../adminpanel/staff/add-staff.component';
import { StaffComponent } from '../../adminpanel/staff/staff.component';
import { SettingComponent } from '../../adminpanel/dashboard/setting.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'patients',             component: UserComponent },
    { path: 'add-new-patient',      component: AddUserComponent },
    { path: 'doctors',              component: DoctorComponent },
    { path: 'add-new-doctor',       component: AddDoctorComponent },
    { path: 'view-appointments',    component: ViewAppointmentComponent },
    { path: 'book-appointment',     component: BookAppointmentComponent },
    { path: 'add-staff',            component: AddStaffComponent },
    { path: 'all-staff',            component: StaffComponent },
    { path: 'settings',             component: SettingComponent }
];
