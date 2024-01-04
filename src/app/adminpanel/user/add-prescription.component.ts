import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from './user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./user-precription.component.css']
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
  patientId: any;
  patientName: any;
  currentUserRole: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
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
    this.currentUserRole = this.currentUser.role_name;
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
      let editPatientData = res;
      if (editPatientData && editPatientData.id) {
         this.patientId   = editPatientData.id;
      } else {
        this.router.navigate(['/admin/patients']);
      }
    })

    this.addPrescriptionsForm = this.formBuilder.group({
      doctorId: ['', ''],
      precritionTitle: ['', Validators.required],
      dosageInstruction: ['', Validators.required]
    });
    this.spinner.show();
    this.getUserDetails();
    this.getActiveDoctorLists();
  }

  // For easy access to form fields
  get f() { return this.addPrescriptionsForm.controls; }

  getActiveDoctorLists() {
    this.spinner.show();
    var data = {
      GetDoctorOperation: {
        rs_add_recin: {
        }
      }
    };

    this.commonService.getActiveDoctorLists(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.doctorsList = getResponseObj.responseData;
      } else {
        this.doctorsList = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  getUserDetails() {
    this.spinner.show();
    var data = {
      GetPatientByIdOperation: {
        rs_add_recin: {
          rs_user_id: this.patientId
        }
      }
    };
    this.patientService.getPatientDetails(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.patientData = getResponseObj.responseData;
        this.f.doctorId.setValue(this.patientData.doctor.id);
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
          rs_doctor_id: this.f.doctorId.value,
          rs_patient_id: this.patientId
        }
      }
    };

    this.patientService.addPrescriptions(userData).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
        this.notifyService.showSuccess(getResponseObj.responseMessage);
        this.addPrescriptionsForm.reset();
        if (this.currentUserRole == 'Admin') {
          this.router.navigate(['/admin/patients']);
        }
        if (this.currentUserRole == 'Doctor') {
          this.router.navigate(['/doctor/patients']);
        }
        if (this.currentUserRole == 'Patient') {
          this.router.navigate(['/patient/prescriptions']);
        }
      } else {
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
