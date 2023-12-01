import { Component, OnInit } from '@angular/core';
import { constantsProps } from '../../commonconfig/props/constants.props';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/doctor/dashboard', title: 'Dashboard',  icon: 'fa fa-pie-chart', class: '' },
    { path: '/doctor/view-appointments', title: constantsProps.BOOKED_APPOINTMENT_DETAILS.VIEW_APPOINTMENTS_PAGE_NAME,  icon:'fa fa-address-book-o', class: '' },
    // { path: '/doctor/book-appointment', title: constantsProps.BOOKED_APPOINTMENT_DETAILS.BOOK_APPOINTMENTS_PAGE_NAME,  icon:'fa fa-plus-square', class: '' },
    // { path: '/admin/patients', title: constantsProps.USER_DETAILS.USER_LIST_PAGE_NAME,  icon:'fa fa-wheelchair', class: '' },
    // { path: '/admin/add-new-patient', title: constantsProps.USER_DETAILS.USER_ADD_PAGE_NAME,  icon:'fa fa-user-plus', class: '' },
    // { path: '/admin/doctors', title: constantsProps.DOCTOR_DETAILS.DOCTOR_LIST_PAGE_NAME,  icon:'fa fa-user-md', class: '' },
    // { path: '/admin/add-new-doctor', title: constantsProps.DOCTOR_DETAILS.DOCTOR_ADD_PAGE_NAME,  icon:'fa fa-address-card-o', class: '' }
];

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html'
})
export class DoctorSidebarComponent implements OnInit {
  menuItems: any[];
  props = constantsProps;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
