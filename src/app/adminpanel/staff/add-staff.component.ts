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
    this.addStaffForm = this.formBuilder.group({
      doctorFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      doctorLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      doctorGender: ['', Validators.required],
      doctorMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      doctorPassword: ['', Validators.required],
      doctorReenterPassword: ['', Validators.required],
      doctorDesignation: ['', ''],
      doctorDepartment: ['', Validators.required],
      doctorAvailablitityStatus: ['', Validators.required],
      doctorAvailableStartTime: [this.currentTime, Validators.required],
      doctorAvailableEndTime: ['', Validators.required],
      userAddress: ['', ''],
      doctorEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      doctorBirthDate: ['', Validators.required],
      doctorEducation: ['', ''],
      doctorExpYears: ['', ''],
      doctorPhoto: ['', Validators.required],
      doctorStatus: ['', Validators.required]      
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

  // For adding a new doctor
  addDoctor() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addStaffForm.invalid) {
        return;
    }
    if (this.f.doctorPassword.value !== this.f.doctorReenterPassword.value) {
      this.notifyService.showError('Passwords do not match.');
    }

    let userfirstname = this.f.doctorFirstname.value.charAt(0).toUpperCase() + this.f.doctorFirstname.value.slice(1).toLowerCase();
    let userlastname = this.f.doctorLastname.value.charAt(0).toUpperCase() + this.f.doctorLastname.value.slice(1).toLowerCase();
    var data = {
        RSSTAFFADDOP: {
            rs_ad_recin: {
                rs_staff_first_name: userfirstname,
                rs_staff_last_name: userlastname,
                rs_staff_gender: this.f.doctorGender.value,
                rs_staff_mobile: this.f.doctorMobile.value,
                rs_staff_password: this.f.doctorPassword.value,
                rs_staff_designation: this.f.doctorDesignation.value,
                rs_staff_department: this.f.doctorDepartment.value,
                rs_staffr_address: this.f.userAddress.value,
                rs_staff_email: this.f.doctorEmail.value,
                rs_staff_available_status: this.f.doctorAvailablitityStatus.value,
                rs_staff_available_start_time: this.datePipe.transform(this.f.doctorAvailableStartTime.value, 'HH::mm:ss'),
                rs_staff_available_end_time: this.datePipe.transform(this.f.doctorAvailableEndTime.value, 'HH:mm:ss'),
                rs_staff_birth_date: this.datePipe.transform(this.f.doctorBirthDate.value, 'YYYY-MM-dd'),
                rs_staff_education: this.f.doctorEducation.value,
                rs_staff_exp_years: this.f.doctorExpYears.value,
                rs_staff_image: this.imgFile,
                rs_staff_status: this.f.doctorStatus.value
            }
        }
    };
  
    console.log('===data====');
    console.log(data);
    // this.staffService.addEmployee(data).subscribe((response:any) => {
    //   this.spinner.hide();
    //   if (response && response.PMM2016OperationResponse && response.PMM2016OperationResponse.ws_ad_recout) {
    //     let msg = response.PMM2016OperationResponse.ws_ad_recout.ws_message;
    //     if (msg.includes('successfully')) {
    //       this.notifyService.showSuccess(msg);
    //       setTimeout(() => {
    //         this.router.navigate(['/admin/search-employee']);
    //       }, 1500)
    //     } else {
    //       this.notifyService.showError(msg);
    //       this.submitted = false;
    //     }
    //   }
    // })
  }
}
