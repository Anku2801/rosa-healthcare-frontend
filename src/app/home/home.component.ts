import { Component, OnInit, ElementRef } from '@angular/core';;
import { constantsProps } from '../commonconfig/props/constants.props';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NotificationmsgService } from '../commonconfig/service/notificationmsg.service';
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
  // bsValue = new Date();

  constructor(private formBuilder: FormBuilder, private element: ElementRef, private notifyService: NotificationmsgService) { 
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
  
  doctorsList = [
    {id: 1, name: "Dr. Leslie Taylor", service: "Pediatrician", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item1.jpg"},
    {id: 2, name: "Dr. Zachary Brown", service: "Cardiologist", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item2.jpg"},
    {id: 3, name: "Dr. Isabella Davies", service: "Gynecologist", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item3.jpg"},
    {id: 4, name: "Dr. William Davies", service: "Nursing", description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.", img: "assets/images/team-item2.jpg"}
  ];

  testimonialList = [
    {id: 1, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "James Rodrigo"},
    {id: 2, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Wednesday Marigold"},
    {id: 3, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Jenny Rose"},
    {id: 4, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Shotgun Garfunkel"},
    {id: 5, comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.The more content you provide about you. Lorem, Quos saepe suscipit, nemo dolore sapiente!", name: "Mrs. James"}
  ];
  
  services = [
    { id: 1, name: "Physiotherapy" },
    { id: 2, name: "Dentistry" },
    { id: 3, name: "Orthopedic" },
    { id: 4, name: "Pharmacy" },
    { id: 5, name: "Nursing" }
  ];

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

    window.addEventListener('scroll', this.scrollEvent, true);
    this.bookingForm = this.formBuilder.group({
      serviceId: ['', Validators.required],
      doctorId: ['', Validators.required],
      userFullName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userPhoneno: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      appointmentDate: [new Date(), Validators.required],
      appointmenTime: ['', Validators.required]
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

  // For adding a appointment
  bookAppointment() {
    this.submitted = true;
    // Stop here if form is invalid
    if (this.bookingForm.invalid) {
        return;
    }

    var data = {
      bookingOperation: {
        rh_add_recin: {
          rh_service_id: this.f.serviceId.value,
          rh_doctor_id: this.f.doctorId.value,
          rh_user_fullname: this.f.userFullName.value,
          rh_user_phoneno: this.f.userPhoneno.value,
          rh_appointment_date: this.datePipe.transform(this.f.appointmentDate.value, 'YYYY-MM-dd'),
          rh_appointment_time: this.f.appointmenTime.value
        }
      }
    };

    this.notifyService.showSuccess('Hi, your appointment has been confirmed <br/>on ' + this.datePipe.transform(this.f.appointmentDate.value, 'dd-MM-YYYY') + '.');
    this.bookingForm.reset();
    this.f.serviceId.setValue('');
    this.f.doctorId.setValue('');
    // this.userService.addUser(data).subscribe((response:any) => {
    //   this.spinner.hide();
    //   console.log(response);
    //   // if (response) {
    //   //   let msg = response.msg;
    //   //   if (msg.includes('successfully')) {
    //   //     this.notifyService.showSuccess(msg);
    //   //     setTimeout(() => {
    //   //       this.router.navigate(['/search-employee']);
    //   //     }, 1500)
    //   //   } else {
    //   //     this.notifyService.showError(msg);
    //   //     this.submitted = false;
    //   //   }
    //   // }
    // })
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
