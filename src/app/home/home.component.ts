import { Component, OnInit, ElementRef } from '@angular/core';;
import { constantsProps } from '../commonconfig/props/constants.props';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { BookedAppointmentService } from '../adminpanel/booked-appointment/booked-appointment.service';
import { NotificationmsgService } from '../commonconfig/service/notificationmsg.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  props = constantsProps;
  submitted: boolean = false;
  bookingForm: FormGroup;
  datePipe = new DatePipe("en-US");
  dateConfig: Partial<BsDatepickerConfig>;
  minDate = new Date();
  location: Location;
  doctorsList: any;
  availableDoctor: any;
  services: any;
  maxDate = new Date();

  constructor(private router: Router, private formBuilder: FormBuilder, private element: ElementRef, private bookingService: BookedAppointmentService, private spinner: NgxSpinnerService, private commonService: CommonService, private notifyService: NotificationmsgService) { 
    this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
  }

  scroll:boolean = false;
  isService:boolean = false;
  isAboutus:boolean = false;
  teamOptions: OwlOptions = {
    loop: false,
    margin:10,
    merge:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: true
  }
  testimonialOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

  testimonialList = [
    {id: 1, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "James Rodrigo"},
    {id: 2, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Wednesday Marigold"},
    {id: 3, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Jenny Rose"},
    {id: 4, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Shotgun Garfunkel"},
    {id: 5, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Mrs. James"}
  ];

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

    this.getActiveDoctors();
    window.addEventListener('scroll', this.scrollEvent, true);

    this.bookingForm = this.formBuilder.group({
      userFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userGender: ['', Validators.required],
      userMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userBirthDate: ['', Validators.required],
      doctorId: ['', Validators.required],
      userAppointmentDate: ['', Validators.required],
      userAppointmentTime: ['', Validators.required],
      userAddress: ['', Validators.required],
      userInjury: ['', Validators.required]
    });
  }

  // For easy access to form fields
  get f() { return this.bookingForm.controls; }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    const scrolllen = event.srcElement.scrollingElement.scrollTop;
    if (scrolllen >= 1000) {
      this.isService = true;
    } else {
      this.isService = false;
    }
    if (scrolllen >= 450) {
      this.isAboutus = true;
    } else {
      this.isAboutus = false;
    }
    if(scrolllen >= 100) { this.scroll=true }
    else{this.scroll=false}
  }

  getActiveDoctors() {
    this.spinner.show();
    var data = {
      GetDoctorOperation: {
        rs_add_recin: {
        }
      }
    };

    this.commonService.getActiveDoctors(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.doctorsList  = getResponseObj.responseData;
        this.availableDoctor = this.doctorsList.filter(x => x.available_status == 'Available');
      } else {
        this.doctorsList = null;
        this.availableDoctor = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
  
  // For adding a appointment
  bookAppointment() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.bookingForm.invalid) {
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
                rs_user_injury: this.f.userInjury.value,
                rs_user_id: '',
                rs_appointment_id: ''
            }
        }
    };

    this.bookingService.addBooking(data).subscribe((response:any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null && getResponseObj.responseStatus == "Success") {
        this.notifyService.showSuccess(getResponseObj.responseMessage);
        this.bookingForm.reset();
      } else {
          this.notifyService.showError(getResponseObj.responseMessage);
      }
    })
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
      const body = document.getElementsByTagName('body')[0];
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
  };
  sidebarToggle() {
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  };
}
