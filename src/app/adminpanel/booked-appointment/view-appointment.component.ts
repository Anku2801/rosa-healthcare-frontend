import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private bookedAppointmentService: BookedAppointmentService,
    private spinner: NgxSpinnerService,
    private dataTableService: DataTableService,
    private notifyService: NotificationmsgService) { }

  ngOnInit() {
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
    this.bookedAppointmentsLists = 
    [
      {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "phone": "777368031",
        "gender": "Male",
        "assigneddoc": "Dr.Jacob Ryan",
        "birthdate": "12/05/2016",
        "date": "12/05/2016",
        "time": "12.00 PM",
        "diseases": "Jaundice",
        "status": "Visited"
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna123333@melissa.tv",
        "phone": "987368031",
        "gender": "Male",
        "assigneddoc": "Dr.Sharon Ryan",
        "birthdate": "09/05/2016",
        "date": "12/05/2016",
        "time": "2.00 PM",
        "diseases": "Jaundice",
        "status": "Visited"
      },
      {
        "id": 3,
        "name": "Sharon Hinje",
        "email": "sharon@melissa.tv",
        "phone": "825368031",
        "gender": "Female",
        "assigneddoc": "Dr.Jacob Ryan",
        "birthdate": "09/05/2016",
        "date": "12/05/2016",
        "time": "2.00 PM",
        "diseases": "Jaundice",
        "status": "Not-Visited"
      },
      {
        "id": 4,
        "name": "Jun Howell",
        "email": "junetest@melissa.tv",
        "phone": "677368031",
        "gender": "Male",
        "assigneddoc": "Dr.Jacob Ryan",
        "birthdate": "09/05/2016",
        "date": "12/05/2016",
        "time": "2.00 PM",
        "diseases": "Jaundice",
        "status": "Visited"
      },
      {
        "id": 5,
        "name": "Rockey Jadhav",
        "email": "rockey@melissa.tv",
        "phone": "817368031",
        "gender": "Female",
        "assigneddoc": "Dr.Jacob Ryan",
        "birthdate": "09/05/2016",
        "date": "12/05/2016",
        "time": "2.00 PM",
        "diseases": "Jaundice",
        "status": "Not-Visited"
      }
    ];
    this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
    // this.spinner.show();
    // var data = { };
    // this.bookedAppointmentService.getAllPatientsList(data).subscribe((response: any) => {
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
