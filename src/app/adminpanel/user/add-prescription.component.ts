import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from './user.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html'
})
export class AddPrescriptionComponent implements OnInit {
  props = constantsProps;
  addPrescriptionsForm: FormGroup;
  dateConfig: Partial<BsDatepickerConfig>;
  submitted: boolean = false;
  datePipe = new DatePipe("en-US");
  currentUser: any;
  doctorsList: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private commonService: CommonService,
              private patientService: UserService) {
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }

    this.addPrescriptionsForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      dosageInstruction: ['', Validators.required]
    });
    this.getActiveDoctors();
  }

  // For easy access to form fields
  get f() { return this.addPrescriptionsForm.controls; }

  getActiveDoctors() {
    this.spinner.show();
    var data = {
      GetDoctorOperation: {
        rs_add_recin: {
        }
      }
    };

    this.commonService.getActiveDoctors(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.doctorsList  = getResponseObj.responseData;
      } else {
        this.doctorsList = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  // For adding prescriptions
  addPrescriptions() {
    this.spinner.show();
    this.submitted = true;
  }
}
