import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { BookedAppointmentService } from './booked-appointment.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  props = constantsProps;
  @ViewChild(DataTableDirective, {static: false})
  dataTableElement: DataTableDirective | null = null;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  resetFilter: any;
  bookedAppointmentsLists: any[];
  currentUser: any;

  constructor(private bookedAppointmentService: BookedAppointmentService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dataTableService: DataTableService,
    private notifyService: NotificationmsgService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }
  
    setTimeout(() => {
      this.getBookedAppoinmentsList(this.resetFilter);
    }, 800)
    this.setDataTableOptionsForSearch();
  }

  ngAfterViewInit(): void {
    this.setDataTableOptionsForSearch();
  }
  
  setDataTableOptionsForSearch() {
    let dtOptionsObj = new DataTableOptions();
    dtOptionsObj.dataTableElement = this.dataTableElement;
    dtOptionsObj.stateSave = false;
    dtOptionsObj.exportTitle = this.props.APP_Name + ' - Booked Appointments';
    dtOptionsObj.exportFileName = 'rs_booked_appointments';
    this.dtOptions = this.dataTableService.getDataTableOptionsWithFilter(dtOptionsObj);
  }

  getBookedAppoinmentsList(resetFilter) {
    this.spinner.show();
    var data = {
      GetBookingOperation: {
        rs_add_recin: {
        }
      }
    };
    this.bookedAppointmentService.getBookingDetails(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.bookedAppointmentsLists = getResponseObj.responseData;
        this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
      } else {
        this.bookedAppointmentsLists = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
