import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { PrescriptionService } from './prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html'
})
export class PrescriptionComponent implements OnInit {
  props = constantsProps;
  addChatForm: FormGroup;
  dateConfig: Partial<BsDatepickerConfig>;
  submitted: boolean = false;
  datePipe = new DatePipe("en-US");

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    // this.addUserForm = this.formBuilder.group({
    //   userFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
    //   userLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
    //   userGender: ['', Validators.required],
    //   userMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
    //   userBirthDate: ['', Validators.required],
    //   userAge: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
    //   userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
    //   userMaritalStatus: ['', Validators.required],
    //   userAddress: ['', Validators.required],
    //   userBloodGroup: ['', Validators.required],
    //   userBloodPresure: ['', Validators.required],
    //   userSugger: ['', Validators.required],
    //   userInjury: ['', Validators.required],
    //   userStatus: ['', Validators.required]
    // });
  }

  // For easy access to form fields
  get f() { return this.addChatForm.controls; }

  // For adding a chat user
  addChatData() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addChatForm.invalid) {
        return;
    }
    // let userfirstname = this.f.userFirstname.value.charAt(0).toUpperCase() + this.f.userFirstname.value.slice(1).toLowerCase();
    // let userlastname = this.f.userLastname.value.charAt(0).toUpperCase() + this.f.userLastname.value.slice(1).toLowerCase();
    // var data = {
    //     RSUSERADDOP: {
    //         rs_ad_recin: {
    //             rs_user_first_name: userfirstname,
    //             rs_user_last_name: userlastname,
    //             rs_user_gender: this.f.userGender.value,
    //             rs_user_mobile: this.f.userMobile.value,
    //             rs_user_birth_date: this.datePipe.transform(this.f.userBirthDate.value, 'YYYY-MM-dd'),
    //             rs_user_age: this.f.userAge.value,
    //             rs_user_email: this.f.userEmail.value,
    //             rs_user_password: 'patient123',
    //             rs_user_marital_status: this.f.userMaritalStatus.value,
    //             rs_user_address: this.f.userAddress.value,
    //             rs_user_blood_group: this.f.userBloodGroup.value,
    //             rs_user_blood_presure: this.f.userBloodPresure.value,
    //             rs_user_sugger: this.f.userSugger.value,
    //             rs_user_injury: this.f.userInjury.value,
    //             rs_user_status: this.f.userStatus.value
    //         }
    //     }
    // };
  
    // console.log('===data====');
    // console.log(data);
    // this.prescriptionService.addEmployee(data).subscribe((response:any) => {
    //   this.spinner.hide();
    //   if (response && response.PMM2016OperationResponse && response.PMM2016OperationResponse.ws_ad_recout) {
    //     let msg = response.PMM2016OperationResponse.ws_ad_recout.ws_message;
    //     if (msg.includes('successfully')) {
    //       this.notifyService.showSuccess(msg);
    //       setTimeout(() => {
    //         this.router.navigate(['/admin/search-employee']);
    //       }, 1500)
    //     } else {
    //       this.notifyService.showError(msg);
    //       this.submitted = false;
    //     }
    //   }
    // })
  }
}
