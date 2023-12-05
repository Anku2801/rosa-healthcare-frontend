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
    { path: '/patient/dashboard', title: 'Dashboard',  icon: 'fa fa-pie-chart', class: '' },
    { path: '/patient/view-appointments', title: constantsProps.BOOKED_APPOINTMENT_DETAILS.VIEW_APPOINTMENTS_PAGE_NAME,  icon:'fa fa-address-book-o', class: '' },
    { path: '/patient/prescriptions', title: constantsProps.USER_DETAILS.USER_PRESCRIPTIONS,  icon:'fa fa-sticky-note', class: '' },
    { path: '/patient/chat', title: constantsProps.USER_DETAILS.USER_CHAT,  icon:'fa fa-commenting-o', class: '' },
    { path: '/patient/settings', title: constantsProps.DOCTOR_DETAILS.DOCTOR_SETTINGS,  icon:'fa fa-cog', class: '' },
    { path: '/patient/logout', title: constantsProps.MENUS.LOGOUT,  icon:'fa fa-power-off', class: '' }
];

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html'
})
export class PatientSidebarComponent implements OnInit {
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
