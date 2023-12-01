import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {

  props = constantsProps;
  updatePasswordForm: FormGroup;
  updateAccountForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifyService: NotificationmsgService,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.updatePasswordForm = this.formBuilder.group({
      userPassword: ['', Validators.required],
      userConfirmPassword: ['', Validators.required],
    });

    this.updateAccountForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      // userAddress: ['', Validators.required]
    });
  }

  // For easy access to form fields
  get f() { return this.updatePasswordForm.controls; }

  updateAccount() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.updateAccountForm.invalid) {
        return;
    }
    let userfirstname = this.f.userFirstname.value.charAt(0).toUpperCase() + this.f.userFirstname.value.slice(1).toLowerCase();
    let userlastname = this.f.userLastname.value.charAt(0).toUpperCase() + this.f.userLastname.value.slice(1).toLowerCase();
    var data = {
      RSUSERADDOP: {
        rs_ad_recin: {
            rs_user_first_name: userfirstname,
            rs_user_last_name: userlastname,
            // rs_user_address: this.f.userAddress.value
        }
      }
    };
  
    console.log('===data====');
    console.log(data);
  }

  // For adding a new user
  changePassword() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.updatePasswordForm.invalid) {
        return;
    }
    if (this.f.userPassword.value !== this.f.userConfirmPassword.value) {
      this.notifyService.showError('Passwords do not match.');
      return;
    }

    var data = {
        RSCHANGEPASSWORDOP: {
            rs_ad_recin: {
                rs_user_id: 1,
                rs_user_password: this.f.userPassword.value,
            }
        }
    };
  
    console.log('===data====');
    console.log(data);
    // this.userService.addEmployee(data).subscribe((response:any) => {
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
