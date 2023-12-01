import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { StaffService } from './staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {

  props = constantsProps;
  @ViewChild(DataTableDirective, {static: false})
  dataTableElement: DataTableDirective | null = null;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  resetFilter: any;
  patientsList: any[]; 

  constructor(private staffService: StaffService,
    private spinner: NgxSpinnerService,
    private dataTableService: DataTableService,
    private notifyService: NotificationmsgService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getPatientsList(this.resetFilter);
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
    dtOptionsObj.exportTitle = this.props.APP_Name + ' - All_Staff';
    dtOptionsObj.exportFileName = 'rs_staff_list';
    this.dtOptions = this.dataTableService.getDataTableOptionsWithFilter(dtOptionsObj);
  }

  getPatientsList(resetFilter){
    this.patientsList = 
    [
      {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "gender": "Male",
        "address": "NEW Delhi - 422101",
        "phone": "777368031",
        "birthdate": "12/05/2016",
        "bloodgroup": "O+",
        "treatment": "Fever",
        "status": "Active"
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "gender": "Male",
        "address": "NEW Delhi - 422101",
        "phone": "987368031",
        "birthdate": "09/05/2016",
        "bloodgroup": "AB+",
        "treatment": "Malaria",
        "status": "Active"
      },
      {
        "id": 3,
        "name": "Sharon Hinje",
        "email": "sharon@melissa.tv",
        "gender": "Female",
        "address": "NEW Delhi - 422101",
        "phone": "825368031",
        "birthdate": "09/05/2016",
        "bloodgroup": "A+",
        "treatment": "Malaria",
        "status": "Inactive"
      },
      {
        "id": 4,
        "name": "Jun Howell",
        "email": "junetest@melissa.tv",
        "gender": "Male",
        "address": "NEW Mumbai - 422101",
        "phone": "677368031",
        "birthdate": "09/05/2016",
        "bloodgroup": "B+",
        "treatment": "Malaria",
        "status": "Active"
      },
      {
        "id": 5,
        "name": "Rockey Jadhav",
        "email": "rockey@melissa.tv",
        "gender": "Female",
        "address": "NEW Nashik - 422101",
        "phone": "817368031",
        "birthdate": "09/05/2016",
        "bloodgroup": "O+",
        "treatment": "Malaria",
        "status": "Inactive"
      }
    ];
    this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
    // this.spinner.show();
    // var data = { };
    // this.userService.getAllPatientsList(data).subscribe((response: any) => {
    //   this.spinner.hide();
    //   let getResponseObj = JSON.parse(JSON.stringify(response));
    //   console.log(getResponseObj);
    //   if (getResponseObj != null && getResponseObj.responseData != null) {
    //     this.patientsList = getResponseObj.responseData;
    //     this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
    //   } else {
    //     this.patientsList = null;
    //     this.notifyService.showError(getResponseObj.responseMessage);
    //   }
    // });
  }
}
