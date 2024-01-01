import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { BookedAppointmentService } from './booked-appointment.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { map } from 'rxjs';

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
  currentUser: any;
  editBookingId: any;
  doctorsList: any;
  availableDoctor: any;
  maxDate: Date;
  minDate: Date;

  @ViewChild("matButtonToggleGroup", { static: true }) 
  buttonToggleGroup: MatButtonToggleGroup;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private commonService: CommonService,
              private bookingService: BookedAppointmentService) {
                this.maxDate = new Date();
                this.minDate = new Date();
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }
    
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    }

    this.getActiveDoctorLists();

    this.addBookingAppoinmentForm = this.formBuilder.group({
      userFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userGender: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userAddress: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userBirthDate: ['', Validators.required],
      doctorId: ['', Validators.required],
      userAppointmentDate: ['', Validators.required],
      userAppointmentTime: ['', Validators.required],
      userInjury: ['', Validators.required]
    });
  
    // Get details
    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
      let editBookingData = res;
      console.log(editBookingData);

      if(editBookingData && (editBookingData != null) && editBookingData.firstName) {
        this.editBookingId = editBookingData.id;
        this.addBookingAppoinmentForm.controls.userFirstname.setValue(editBookingData.firstName);
        this.addBookingAppoinmentForm.controls.userLastname.setValue(editBookingData.lastName);
        this.addBookingAppoinmentForm.controls.userGender.setValue(editBookingData.gender);
        this.addBookingAppoinmentForm.controls.userMobile.setValue(editBookingData.mobile);
        this.addBookingAppoinmentForm.controls.userAddress.setValue(editBookingData.address);
        this.addBookingAppoinmentForm.controls.userEmail.setValue(editBookingData.email);
        this.addBookingAppoinmentForm.controls.userBirthDate.setValue(new Date(editBookingData.birthDate));
        this.addBookingAppoinmentForm.controls.doctorId.setValue(editBookingData.doctor.id);
        this.addBookingAppoinmentForm.controls.userAppointmentDate.setValue(new Date(editBookingData.appointmentDate));
        this.selectedVal = editBookingData.appointmentTime;
        this.f.userAppointmentTime.setValue(this.selectedVal);        
        this.addBookingAppoinmentForm.controls.userInjury.setValue(editBookingData.injury);
      }
    })
  }

  // For easy access to form fields
  get f() { return this.addBookingAppoinmentForm.controls; }

  public onValChange(val: string) {
    this.selectedVal = val;
    this.f.userAppointmentTime.setValue(this.selectedVal);
    console.log(this.selectedVal);
  }

  getActiveDoctorLists() {
    this.spinner.show();
    var data = {
      GetDoctorOperation: {
        rs_add_recin: {
        }
      }
    };

    this.commonService.getActiveDoctorLists(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.doctorsList = getResponseObj.responseData;
        this.availableDoctor = this.doctorsList.filter(x => x.available_status == 'Available');
      } else {
        this.doctorsList = null;
        this.availableDoctor= null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
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
                rs_user_birth_date: this.datePipe.transform(this.f.userBirthDate.value, 'YYYY-MM-dd'),
                rs_doctor_id: this.f.doctorId.value,
                rs_appointment_date: this.datePipe.transform(this.f.userAppointmentDate.value, 'YYYY-MM-dd'),
                rs_appointment_time: this.f.userAppointmentTime.value,
                rs_user_injury: this.f.userInjury.value
            }
        }
    };

    if (this.editBookingId) {
      data.RSBOOKAPPADDOP.rs_ad_recin['rs_appointment_id'] = this.editBookingId;
    } else {
      data.RSBOOKAPPADDOP.rs_ad_recin['rs_appointment_id'] = '';
    }

    this.bookingService.addBooking(data).subscribe((response:any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null && getResponseObj.responseStatus == "Success") {
        this.notifyService.showSuccess(getResponseObj.responseMessage);
        this.addBookingAppoinmentForm.reset();
        this.router.navigate(['/admin/view-appointments']);
      } else {
          this.notifyService.showError(getResponseObj.responseMessage);
      }
    })
  }
}
