import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from './user.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  props = constantsProps;
  addPatientForm: FormGroup;
  dateConfig: Partial<BsDatepickerConfig>;
  submitted: boolean = false;
  datePipe = new DatePipe("en-US");
  currentUser: any;
  editPatientId: any;
  doctorsList: any;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private commonService: CommonService,
              private notifyService: NotificationmsgService,
              private patientService: UserService) {
                this.maxDate = new Date();
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }

    this.getActiveDoctors();

    this.addPatientForm = this.formBuilder.group({
      userFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userGender: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userBirthDate: ['', Validators.required],
      userAge: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      doctorId: ['', Validators.required],
      userMaritalStatus: ['', Validators.required],
      userAddress: ['', Validators.required],
      userBloodGroup: ['', Validators.required],
      userBloodPresure: ['', Validators.required],
      userSugger: ['', Validators.required],
      userInjury: ['', Validators.required],
      userStatus: ['', Validators.required]
    });

    // Get details
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
      let editPatientData = res;

      console.log('editPatientDatabnnnnnnnnnn====');
      console.log(editPatientData);
      if(editPatientData && (editPatientData != null) && (editPatientData.gender)) {
        this.editPatientId = editPatientData.id;
        this.addPatientForm.controls.userFirstname.setValue(editPatientData.user.first_name);
        this.addPatientForm.controls.userLastname.setValue(editPatientData.user.last_name);
        this.addPatientForm.controls.userGender.setValue(editPatientData.gender);
        this.addPatientForm.controls.userMobile.setValue(editPatientData.user.phone_no);
        this.addPatientForm.controls.userBirthDate.setValue(new Date(editPatientData.birth_date));
        this.addPatientForm.controls.userAge.setValue(editPatientData.age);
        this.addPatientForm.controls.userEmail.setValue(editPatientData.user.email);
        this.addPatientForm.controls.doctorId.setValue(editPatientData.doctor.id);
        this.addPatientForm.controls.userMaritalStatus.setValue(editPatientData.marital_status);
        this.addPatientForm.controls.userAddress.setValue(editPatientData.address);
        this.addPatientForm.controls.userBloodGroup.setValue(editPatientData.blood_group);
        this.addPatientForm.controls.userBloodPresure.setValue(editPatientData.blood_presure);
        this.addPatientForm.controls.userSugger.setValue(editPatientData.sugger);
        this.addPatientForm.controls.userInjury.setValue(editPatientData.injury);
        this.addPatientForm.controls.userStatus.setValue(editPatientData.user.status); 
      }
    })
  }

  // For easy access to form fields
  get f() { return this.addPatientForm.controls; }

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
        this.doctorsList = getResponseObj.responseData;
      } else {
        this.doctorsList = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  // For adding a new user
  addPatient() {
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addPatientForm.invalid) {
        return;
    }
    
    this.spinner.show();
    let userfirstname = this.f.userFirstname.value.charAt(0).toUpperCase() + this.f.userFirstname.value.slice(1).toLowerCase();
    let userlastname = this.f.userLastname.value.charAt(0).toUpperCase() + this.f.userLastname.value.slice(1).toLowerCase();
    var data = {
        RSPATIENTADDOP: {
            rs_ad_recin: {
                rs_user_first_name: userfirstname,
                rs_user_last_name: userlastname,
                rs_user_gender: this.f.userGender.value,
                rs_user_mobile: this.f.userMobile.value,
                rs_user_birth_date: this.datePipe.transform(this.f.userBirthDate.value, 'YYYY-MM-dd'),
                rs_user_age: this.f.userAge.value,
                rs_user_email: this.f.userEmail.value,
                rs_user_password: (this.editPatientId) ? '' : 'rosahealthcare',
                rs_doctor_id: this.f.doctorId.value,
                rs_user_marital_status: this.f.userMaritalStatus.value,
                rs_user_address: this.f.userAddress.value,
                rs_user_blood_group: this.f.userBloodGroup.value,
                rs_user_blood_presure: this.f.userBloodPresure.value,
                rs_user_sugger: this.f.userSugger.value,
                rs_user_injury: this.f.userInjury.value,
                rs_user_status: this.f.userStatus.value,
                rs_created_user_id: this.currentUser.id

            }
        }
    };
  
    if (this.editPatientId) {
      data.RSPATIENTADDOP.rs_ad_recin['rs_patient_id'] = this.editPatientId;
    } else {
      data.RSPATIENTADDOP.rs_ad_recin['rs_patient_id'] = '';
    }

    console.log('===data====');
    console.log(data);
    this.patientService.addPatient(data).subscribe((response:any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log('====getResponseObj=====');
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null && getResponseObj.responseStatus == "Success") {
        this.notifyService.showSuccess(getResponseObj.responseMessage);
        this.addPatientForm.reset();
        this.router.navigate(['/admin/patients']);
      } else {
          this.notifyService.showError(getResponseObj.responseMessage);
      }
    })
  }
}
