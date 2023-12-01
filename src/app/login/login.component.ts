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
  // currentUser = { currentUserName: '', currentUserID: ''};

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private autoLogoutService: AutoLogoutService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userPassword: ['', Validators.required]
    });
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
    console.log(data);
    this.loginService.validateLogin(data).subscribe((response:any) => {
      console.log(response);
      // if (response && response.PMM2011OperationResponse
      //     && response.PMM2011OperationResponse.ws_log_recout 
      //     && response.PMM2011OperationResponse.ws_log_recout.ws_out_status) {
      //     let msg = response.PMM2011OperationResponse.ws_log_recout.ws_out_status;
      //     if (msg.includes('welcome')) {
      //         const array = msg.split('welcome ');
      //         const result = array.pop(); 
      //         // this.currentUser = {
      //         //     currentUserID: this.f.empId.value,
      //         //     currentUserName: result
      //         // };
      //         // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      //         this.router.navigate(['/admin/dashboard']);
      //     } else {
      //         this.errorMsg = msg;
      //         return false;
      //     }
      // }
    })
  }
}
