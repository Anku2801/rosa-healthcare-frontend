import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from '../../adminpanel/user/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html'
})
export class PrescriptionComponent implements OnInit {

  props = constantsProps;
  @ViewChild(DataTableDirective, {static: false})
  dataTableElement: DataTableDirective | null = null;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  resetFilter: any;
  precreiptionsList: any[]; 
  currentUser: any;
  currentRole: any;
  patientId : any;
  patientName: any;
  editPatientData: any;
  patientData: any;

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private patientService: UserService,
    private dataTableService: DataTableService,
    private notifyService: NotificationmsgService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }
    this.patientName = this.currentUser.first_name + ' ' + this.currentUser.last_name
    this.currentRole = this.currentUser.role_name;
    
    setTimeout(() => {
      this.getPrescriptionsList(this.resetFilter);
    }, 800)
    this.setDataTableOptionsForSearch();
  }

  ngAfterViewInit(): void {
    this.setDataTableOptionsForSearch();
  }
  
  setDataTableOptionsForSearch() {
    let dtOptionsObj = new DataTableOptions();
    dtOptionsObj.dataTableElement = this.dataTableElement;
    this.dtOptions = this.dataTableService.getDataTableOptionsWithFilter(dtOptionsObj);
  }

  getPrescriptionsList(resetFilter) {
    this.spinner.show();
    var data = {
      RSPRESGETOP: {
        rs_add_recin: {
          rs_user_id: this.currentUser.id
        }
      }
    };

    this.userService.getUserPrescriptionsList(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.precreiptionsList = getResponseObj.responseData;
        this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
      } else {
        this.precreiptionsList = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
