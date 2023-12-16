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
      userAddress: [this.currentUser.last_name, Validators.required],
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
      } else {
        var data = {
          RSDOCADDOP: {
            rs_ad_recin: {
                rs_user_pswd: this.f.userPassword.value,
                rs_created_user_id: this.currentUser.id
            }
          }
        };

        console.log('changePassword===========');
        console.log(data);

        this.settingService.changePassword(data).subscribe((response: any) => {
          let getResponseObj = JSON.parse(JSON.stringify(response));
          console.log('====changePassword=====');
          console.log(getResponseObj);
        });
      }
    } else {
      let userfirstname = this.f.userFirstname.value.charAt(0).toUpperCase() + this.f.userFirstname.value.slice(1).toLowerCase();
      let userlastname = this.f.userLastname.value.charAt(0).toUpperCase() + this.f.userLastname.value.slice(1).toLowerCase();
      var userData = {
        RSDOCADDOP: {
          rs_ad_recin: {
            rs_user_first_name: userfirstname,
            rs_user_last_name: userlastname,
            rs_user_address: this.f.userAddress.value,
            rs_created_user_id: this.currentUser.id
          }
        }
      };

      console.log('userData===========');
      console.log(userData);

      this.settingService.changeUserData(userData).subscribe((response: any) => {
        let getResponseObj = JSON.parse(JSON.stringify(response));
        console.log('====changeUserData=====');
        console.log(getResponseObj);
      });
    }
  }
}
