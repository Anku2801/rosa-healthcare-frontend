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
    { path: '/doctor/patients', title: constantsProps.USER_DETAILS.USER_LIST_PAGE_NAME,  icon:'fa fa-wheelchair', class: '' },
    { path: '/doctor/doctors', title: constantsProps.DOCTOR_DETAILS.DOCTOR_LIST_PAGE_NAME,  icon:'fa fa-user-md', class: '' },
    { path: '/doctor/settings', title: constantsProps.DOCTOR_DETAILS.DOCTOR_LIST_PAGE_NAME,  icon:'fa fa-cog', class: '' },
    { path: '/doctor/logout', title: constantsProps.MENUS.LOGOUT,  icon:'fa fa-power-off', class: '' }
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
