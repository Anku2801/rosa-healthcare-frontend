import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../commonconfig/service/api.service';
import { constantsProps } from '../commonconfig/props/constants.props';
import { LoginService  } from './login.service';
import { AutoLogoutService  } from './auto-logout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  props = constantsProps;
  submitted: boolean = false;
  loginForm: any;
  errorMsg: String = '';
  currentUser = { currentUserName: '', currentUserID: ''};

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private autoLogoutService: AutoLogoutService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    localStorage.setItem('currentUser', null);
    localStorage.removeItem('currentUser');
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userPassword: ['', Validators.required]
    });

    this.autoLogoutService.initInterval();
  }

  // For easy access to form fields
  get f() { return this.loginForm.controls; }

  // On Login Submit
  onLogin() {
    this.submitted = true;
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.errorMsg = '';
    var data = {
      RSLoginOperation: {
          rs_log_recin: {
              rs_user_email: this.f.userEmail.value,
              rs_user_pswd: this.f.userPassword.value
          }
      }
    };
    this.loginService.validateLogin(data).subscribe((response:any) => {
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null) {
        if (getResponseObj.responseData.role_name === 'Admin') {
          this.currentUser = getResponseObj.responseData;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.router.navigate(['/admin/dashboard']);
        } else if (getResponseObj.responseData.role_name === 'Doctor') {
          this.currentUser = getResponseObj.responseData;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.router.navigate(['/doctor/dashboard']);
        } else if (getResponseObj.responseData.role_name === 'Patient') {
          this.currentUser = getResponseObj.responseData;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.router.navigate(['/patient/dashboard']);
        } else {
          this.currentUser = null;
          this.errorMsg = 'You don\'t have permission to access this server';
        }       
      } else {
        this.currentUser = null;
        this.errorMsg = getResponseObj.responseMessage;
      }
    })
  }
}
