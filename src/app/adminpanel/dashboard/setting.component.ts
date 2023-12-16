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
      userFirstName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userAddress: ['', Validators.required],
      userPassword: ['', ''],
      userConfirmPassword: ['', '']
    });
  }

  // For easy access to form fields
  get f() { return this.settingsForm.controls; }

  updateAccount() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.settingsForm.invalid) {
        return;
    }
  }
}
