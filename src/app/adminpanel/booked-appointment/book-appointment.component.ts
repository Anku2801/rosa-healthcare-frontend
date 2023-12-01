import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonToggleGroup, MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { BookedAppointmentService } from './booked-appointment.service';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {
  props = constantsProps;
  addBookingAppoinmentForm: FormGroup;
  dateConfig: Partial<BsDatepickerConfig>;
  submitted: boolean = false;
  datePipe = new DatePipe("en-US");
  public selectedVal: string;
  doctorsList = [
    {id: 1, name: "Dr. Leslie Taylor", service: "Pediatrician", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item1.jpg"},
    {id: 2, name: "Dr. Zachary Brown", service: "Cardiologist", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item2.jpg"},
    {id: 3, name: "Dr. Isabella Davies", service: "Gynecologist", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item3.jpg"},
    {id: 4, name: "Dr. William Davies", service: "Nursing", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item2.jpg"}
  ];

  @ViewChild("matButtonToggleGroup", { static: true }) 
  buttonToggleGroup: MatButtonToggleGroup;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private userService: BookedAppointmentService) {
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }
    
    ngOnInit() {
    this.addBookingAppoinmentForm = this.formBuilder.group({
      userFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userGender: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userAddress: ['', ''],
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userBirthDate: ['', Validators.required],
      doctorId: ['', Validators.required],
      userAppointmentDate: ['', Validators.required],
      userAppointmentTime: ['', Validators.required],
      userInjury: ['', '']
    });
  }

  // For easy access to form fields
  get f() { return this.addBookingAppoinmentForm.controls; }

  public onValChange(val: string) {
    this.selectedVal = val;
    this.f.userAppointmentTime.setValue(this.selectedVal);
    console.log(this.selectedVal);
  }

  // For adding a new booking an appoinment
  addBooking() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addBookingAppoinmentForm.invalid) {
        return;
    }
    let userfirstname = this.f.userFirstname.value.charAt(0).toUpperCase() + this.f.userFirstname.value.slice(1).toLowerCase();
    let userlastname = this.f.userLastname.value.charAt(0).toUpperCase() + this.f.userLastname.value.slice(1).toLowerCase();
    var data = {
        RSBOOKAPPADDOP: {
            rs_ad_recin: {
                rs_user_first_name: userfirstname,
                rs_user_last_name: userlastname,
                rs_user_gender: this.f.userGender.value,
                rs_user_mobile: this.f.userMobile.value,
                rs_user_address: this.f.userAddress.value,
                rs_user_email: this.f.userEmail.value,
                rs_user_password: '',
                rs_user_birth_date: this.datePipe.transform(this.f.userBirthDate.value, 'YYYY-MM-dd'),
                rs_doctor_id: this.f.doctorId.value,
                rs_appointment_date: this.datePipe.transform(this.f.userAppointmentDate.value, 'YYYY-MM-dd'),
                rs_appointment_time: this.f.userAppointmentTime.value,
                rs_user_injury: this.f.userInjury.value,
                rs_user_status: this.props.USER_DETAILS.USER_INACTIVE
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
    //         this.router.navigate(['/admin/view-appointments']);
    //       }, 1500)
    //     } else {
    //       this.notifyService.showError(msg);
    //       this.submitted = false;
    //     }
    //   }
    // })
  }
}
