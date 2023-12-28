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
  patientData: any;

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
      doctorId: ['', ''],
      precritionTitle: ['', Validators.required],
      dosageInstruction: ['', Validators.required]
    });
    this.getUserDetails();
  }

  // For easy access to form fields
  get f() { return this.addPrescriptionsForm.controls; }

  getUserDetails() {
    this.spinner.show();
    var data = {
      GetPatientByIdOperation: {
        rs_add_recin: {
          rs_user_id: 1
        }
      }
    };
    this.patientService.getPatientDetails(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.patientData = getResponseObj.responseData;
      } else {
        this.patientData = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  // For adding prescriptions
  addPrescriptions() {
    this.spinner.show();
    this.submitted = true;
    var userData = {
      RSPRESADDOP: {
        rs_ad_recin: {
          rs_prescription_title: this.f.precritionTitle.value,
          rs_user_dosage_instruction: this.f.dosageInstruction.value,
          rs_user_prescription_date: this.datePipe.transform(new Date(), 'YYYY-MM-dd'),
          rs_doctor_id: 1,
          rs_patient_id: this.currentUser.id
        }
      }
    };

    this.patientService.addPrescriptions(userData).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
        this.notifyService.showSuccess(getResponseObj.responseMessage);
      } else {
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
