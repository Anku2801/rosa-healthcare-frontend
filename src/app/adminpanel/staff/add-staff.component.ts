import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { StaffService } from './staff.service';


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html'
})
export class AddStaffComponent implements OnInit {
  props = constantsProps;
  addStaffForm: FormGroup;
  dateConfig: Partial<BsDatepickerConfig>;
  submitted: boolean = false;
  datePipe = new DatePipe("en-US");
  imagePreviewSrc: any;
  isImageSelected: boolean = false;
  imgFile: any;
  currentTime= new Date();
  currentUser: any;
  
  services = [
    { id: 1, name: "Neurology" },
    { id: 2, name: "Orthopedics" },
    { id: 3, name: "Gynaecology" },
    { id: 4, name: "Microbiology" },
    { id: 5, name: "Nursing" }
  ];
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private staffService: StaffService) {
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }

    this.addStaffForm = this.formBuilder.group({
      userFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userGender: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userPassword: ['', Validators.required],
      userReenterPassword: ['', Validators.required],
      userDesignation: ['', Validators.required],
      userDepartment: ['', Validators.required],
      userAvailablitityStatus: ['', Validators.required],
      userAvailableStartTime: [this.currentTime, Validators.required],
      userAvailableEndTime: ['', Validators.required],
      userAddress: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userBirthDate: ['', Validators.required],
      userEducation: ['', Validators.required],
      userExpYears: ['', Validators.required],
      userStatus: ['', Validators.required]      
    });
  }

  // For easy access to form fields
  get f() { return this.addStaffForm.controls; }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imgFile = event.target.files[0];
      var reader: FileReader = new FileReader();
      reader.onload = (readerEvt: any) => {
        this.imagePreviewSrc = readerEvt.target.result;
        this.isImageSelected = true;
      };
      reader.readAsDataURL(event.target.files[0]);
      reader.onerror = function (error) {
          console.log('Error: ', error);
      }
    }
  }

  // For adding a new user
  addUser() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addStaffForm.invalid) {
        return;
    }
    if (this.f.userPassword.value !== this.f.userReenterPassword.value) {
      this.notifyService.showError('Password do not match.');
      return;
    }

    let userfirstname = this.f.userFirstname.value.charAt(0).toUpperCase() + this.f.userFirstname.value.slice(1).toLowerCase();
    let userlastname = this.f.userLastname.value.charAt(0).toUpperCase() + this.f.userLastname.value.slice(1).toLowerCase();
    var data = {
        RSADMINAPPADDOP: {
            rs_ad_recin: {
              rs_user_first_name: userfirstname,
              rs_user_last_name: userlastname,
              rs_user_gender: this.f.userGender.value,
              rs_user_mobile: this.f.userMobile.value,
              rs_user_password: this.f.userPassword.value,
              rs_user_designation: this.f.userDesignation.value,
              rs_user_department: this.f.userDepartment.value,
              rs_user_address: this.f.userAddress.value,
              rs_user_email: this.f.userEmail.value,
              rs_user_available_status: this.f.userAvailablitityStatus.value,
              rs_user_start_time: this.datePipe.transform(this.f.userAvailableStartTime.value, 'HH::mm:ss'),
              rs_user_end_time: this.datePipe.transform(this.f.userAvailableEndTime.value, 'HH:mm:ss'),
              rs_user_birth_date: this.datePipe.transform(this.f.userBirthDate.value, 'YYYY-MM-dd'),
              rs_user_education: this.f.userEducation.value,
              rs_user_exp_years: this.f.userExpYears.value,
              rs_user_status: this.f.userStatus.value,
              rs_created_user_id: this.currentUser.id
            }
        }
    };
  
    console.log('===data====');
    console.log(data);
    this.staffService.addUser(data).subscribe((response:any) => {
      this.spinner.hide();
      console.log(response);
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log('====getResponseObj=====');
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null && getResponseObj.responseStatus == "Success") {
        this.notifyService.showSuccess(getResponseObj.responseMessage);
        this.addStaffForm.reset();
        this.router.navigate(['/admin/all-staff']);
      } else {
          this.notifyService.showError(getResponseObj.responseMessage);
      }
    })
  }
}
