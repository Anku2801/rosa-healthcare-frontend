import { Component, OnInit } from '@angular/core';
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
  settingsForm: FormGroup;
  submitted: boolean = false;
  currentUser: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifyService: NotificationmsgService,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }
    this.settingsForm = this.formBuilder.group({
      userFirstName: [this.currentUser.first_name, [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastName: [this.currentUser.last_name, [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userAddress: [this.currentUser.Address, Validators.required],
      userPassword: ['', ''],
      userConfirmPassword: ['', '']
    });
  }

  // For easy access to form fields
  get f() { return this.settingsForm.controls; }

  updateAccount(type) {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.settingsForm.invalid) {
        return;
    }

    if (type == 'password') {
      if ((this.f.userPassword.value == '') || (this.f.userConfirmPassword.value == '') || (this.f.userPassword.value !== this.f.userConfirmPassword.value)) {
        this.notifyService.showError('Passwords do not match.');
        return;
      }

      var data = {
        RSDOCADDOP: {
          rs_ad_recin: {
              rs_user_pswd: this.f.userPassword.value,
              rs_user_id: this.currentUser.id
          }
        }
      };

      this.settingService.changePassword(data).subscribe((response: any) => {
        this.spinner.hide();
        let getResponseObj = JSON.parse(JSON.stringify(response));
        if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
          this.notifyService.showSuccess(getResponseObj.responseMessage);
          this.settingsForm.get('userPassword').reset();
          this.settingsForm.get('userConfirmPassword').reset();
        } else {
          this.notifyService.showError(getResponseObj.responseMessage);
        }
      });
    } 
    
    if (type == 'changes') {
      let userfirstname = this.f.userFirstName.value.charAt(0).toUpperCase() + this.f.userFirstName.value.slice(1).toLowerCase();
      let userlastname = this.f.userLastName.value.charAt(0).toUpperCase() + this.f.userLastName.value.slice(1).toLowerCase();
      var userData = {
        RSDOCADDOP: {
          rs_ad_recin: {
            rs_user_first_name: userfirstname,
            rs_user_last_name: userlastname,
            rs_user_address: this.f.userAddress.value,
            rs_user_id: this.currentUser.id
          }
        }
      };

      this.settingService.changeUserData(userData).subscribe((response: any) => {
        this.spinner.hide();
        let getResponseObj = JSON.parse(JSON.stringify(response));
        if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
          this.notifyService.showSuccess(getResponseObj.responseMessage);
        } else {
          this.notifyService.showError(getResponseObj.responseMessage);
        }
      });
    }
  }
}
