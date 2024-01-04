import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  props = constantsProps;
  @ViewChild(DataTableDirective, {static: false})
  dataTableElement: DataTableDirective | null = null;
  dtOptions: any = {};
  datePipe = new DatePipe("en-US");
  dtTrigger: Subject<any> = new Subject();
  resetFilter: any;
  doctorsList: any[]; 
  currentUser: any;
  currentRole: any; 

  constructor(private doctorService: DoctorService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dataTableService: DataTableService,
    private notifyService: NotificationmsgService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    } 
    this.currentRole = this.currentUser.role_name;

    setTimeout(() => {
      this.getDoctorsList(this.resetFilter);
    }, 1000)
    this.setDataTableOptionsForSearch();
  }

  ngAfterViewInit(): void {
    this.setDataTableOptionsForSearch();
  }
  
  setDataTableOptionsForSearch() {
    let dtOptionsObj = new DataTableOptions();
    dtOptionsObj.dataTableElement = this.dataTableElement;
    dtOptionsObj.stateSave = false;
    dtOptionsObj.exportTitle = this.props.APP_Name + ' - Doctors';
    dtOptionsObj.exportFileName = 'rs_doctors_list';
    this.dtOptions = this.dataTableService.getDataTableOptionsWithFilter(dtOptionsObj);
  }

  getDoctorsList(resetFilter){
    this.spinner.show();
    var data = {
      GetDoctorOperation: {
        rs_add_recin: {
        }
      }
    };

    this.doctorService.getAllDoctors(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
         this.doctorsList = getResponseObj.responseData;
         this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
      } else {
         this.doctorsList = null;
         this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
