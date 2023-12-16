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
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'fa fa-pie-chart', class: '' },
    { path: '/admin/view-appointments', title: constantsProps.BOOKED_APPOINTMENT_DETAILS.VIEW_APPOINTMENTS_PAGE_NAME,  icon:'fa fa-address-book-o', class: '' },
    { path: '/admin/book-appointment', title: constantsProps.BOOKED_APPOINTMENT_DETAILS.BOOK_APPOINTMENTS_PAGE_NAME,  icon:'fa fa-plus-square', class: '' },
    { path: '/admin/patients', title: constantsProps.USER_DETAILS.USER_LIST_PAGE_NAME,  icon:'fa fa-wheelchair', class: '' },
    { path: '/admin/add-patient', title: constantsProps.USER_DETAILS.USER_ADD_PAGE_NAME,  icon:'fa fa-user-plus', class: '' },
    { path: '/admin/doctors', title: constantsProps.DOCTOR_DETAILS.DOCTOR_LIST_PAGE_NAME,  icon:'fa fa-user-md', class: '' },
    { path: '/admin/add-doctor', title: constantsProps.DOCTOR_DETAILS.DOCTOR_ADD_PAGE_NAME,  icon:'fa fa-address-card-o', class: '' },
    { path: '/admin/all-staff', title: constantsProps.DOCTOR_DETAILS.DOCTOR_STAFF_LIST_PAGE_NAME,  icon:'fa fa-users', class: '' },
    { path: '/admin/add-staff', title: constantsProps.DOCTOR_DETAILS.DOCTOR_STAFF_ADD_PAGE_NAME,  icon:'fa fa-plus-square-o', class: '' },
    { path: '/admin/settings', title: constantsProps.DOCTOR_DETAILS.DOCTOR_SETTINGS,  icon:'fa fa-cog', class: '' },
    { path: '/admin/logout', title: constantsProps.MENUS.LOGOUT,  icon:'fa fa-power-off', class: '' }
];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent implements OnInit {
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
