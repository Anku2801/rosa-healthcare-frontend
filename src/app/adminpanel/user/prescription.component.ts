import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from './user.service';
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
  patientsList: any[]; 
  currentUser: any;
  patientId : any;

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataTableService: DataTableService,
    private notifyService: NotificationmsgService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }

    console.log("innnnnn");
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
      let editPatientData = res;
      this.patientId = editPatientData.id;
    })
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
          rs_patient_id: this.patientId
        }
      }
    };

    this.userService.getAllPrescriptionsList(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      // if (getResponseObj != null && getResponseObj.responseData != null) {
      //   this.patientsList = getResponseObj.responseData;
      //   this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
      // } else {
      //   this.patientsList = null;
      //   this.notifyService.showError(getResponseObj.responseMessage);
      // }
    });
  }
}
