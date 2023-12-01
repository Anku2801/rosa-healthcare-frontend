import { Routes } from '@angular/router';

import { DashboardComponent } from '../../doctorpanel/dashboard/dashboard.component';
import { ViewAppointmentComponent } from '../../adminpanel/booked-appointment/view-appointment.component';
// import { BookAppointmentComponent } from '../../adminpanel/booked-appointment/book-appointment.component';
// import { UserComponent } from '../../adminpanel/user/user.component';
// import { AddUserComponent } from '../../adminpanel/user/add-user.component';
// import { DoctorComponent } from '../../adminpanel/doctor/doctor.component';
// import { AddDoctorComponent } from '../../adminpanel/doctor/add-doctor.component';

export const DoctorLayoutRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'view-appointments',    component: ViewAppointmentComponent },
    // { path: 'book-appointment',     component: BookAppointmentComponent }
    // { path: 'patients',             component: UserComponent },
    // { path: 'add-new-patient',      component: AddUserComponent },
    // { path: 'doctors',              component: DoctorComponent },
    // { path: 'add-new-doctor',       component: AddDoctorComponent },
];
