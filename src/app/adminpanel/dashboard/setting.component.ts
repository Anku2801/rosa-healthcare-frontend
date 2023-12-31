import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { SettingService } from './setting.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {

  props = constantsProps;
  settingsForm: FormGroup;
  submitted: boolean = false;
  currentUser: any;
  currentUserData: any;
  datePipe = new DatePipe("en-US");
  getCurrentRole : any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifyService: NotificationmsgService,
    private patientService: UserService,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }
    
    this.getCurrentRole = this.currentUser.role_name;
    if (this.getCurrentRole == 'Patient') {
      this.settingsForm = this.formBuilder.group({
        userFirstName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
        userLastName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
        userAddress: ['', Validators.required],
        userPassword: ['', ''],
        userConfirmPassword: ['', '']
      });
    } else {
      this.settingsForm = this.formBuilder.group({
        userFirstName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
        userLastName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
        userAddress: ['', Validators.required],
        userPassword: ['', ''],
        userConfirmPassword: ['', ''],
        userAvailablitityStatus: ['', ''],
        userAvailableStartTime: ['', ''],
        userAvailableEndTime: ['', ''],
      });
    }
    
    this.getUserDetails();
  }

  // For easy access to form fields
  get f() { return this.settingsForm.controls; }

  getUserDetails() {
    this.spinner.show();
    var data = {
      RSDOCGETOP: {
        rs_add_recin: {
          rs_user_id: this.currentUser.id
        }
      }
    };
    this.patientService.getUserDetails(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log('patientdara');
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
        this.currentUserData = getResponseObj.responseData;
        this.settingsForm.controls.userFirstName.setValue(this.currentUserData.firstName);
        this.settingsForm.controls.userLastName.setValue(this.currentUserData.lastName);
        this.settingsForm.controls.userAddress.setValue(this.currentUserData.addres);
        if (this.getCurrentRole != 'Patient') {
            let startTime = this.currentUserData.AvailableStartTime;
            const startTimeArray = startTime.split(":").map((time) => +time);
            const getStarttime = new Date();
            getStarttime.setHours(startTimeArray[0]);
            getStarttime.setMinutes(startTimeArray[1]);
            let endTime = this.currentUserData.AvailableEndTime;
            const endTimesArray = endTime.split(":").map((time) => +time);
            const getEndtime = new Date();
            getEndtime.setHours(endTimesArray[0]);
            getEndtime.setMinutes(endTimesArray[1]);
            this.settingsForm.controls.userAvailablitityStatus.setValue(this.currentUserData.Status);
            this.settingsForm.controls.userAvailableStartTime.setValue(getStarttime);
            this.settingsForm.controls.userAvailableEndTime.setValue(getEndtime);
        }     
      } else {
        this.currentUserData = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
  
  updateAccount(type) {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.settingsForm.invalid) {
        return;
    }
    console.log("nnnnnnnnnnnnnnnnnnn");
    if (type == 'password') {
      console.log("iiiiiiiiiiiii");
      // let pass = this.f.userPassword.value;
      // let confirmPass = this.f.userConfirmPassword.value; 
      // console.log(pass);
      // console.log(confirmPass);
      if (((this.f.userPassword.value == '') || (this.f.userConfirmPassword.value == '')) || (this.f.userPassword.value != this.f.userConfirmPassword.value)) {
        this.spinner.hide();
        this.notifyService.showError('Passwords do not match.');
        return;
      }
      // if (((pass == '') || (confirmPass == '')) || (pass != confirmPass)) {
      //   this.spinner.hide();
      //   this.notifyService.showError('Passwords do not match.');
      //   return;
      // }

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

    if (type == 'available') {
      var userTimedata = {
        RSUPDATEOP: {
          rs_ad_recin: {
              rs_user_available_status: this.f.userAvailablitityStatus.value,
              rs_user_available_start_time: this.datePipe.transform(this.f.userAvailableStartTime.value, 'HH::mm'),
              rs_user_available_end_time: this.datePipe.transform(this.f.userAvailableEndTime.value, 'HH::mm'),
              rs_user_id: this.currentUser.id
          }
        }
      };

      this.settingService.updateAvailableStatus(userTimedata).subscribe((response: any) => {
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
