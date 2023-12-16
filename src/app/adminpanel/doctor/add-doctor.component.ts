import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DoctorService } from './doctor.service';


@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html'
})
export class AddDoctorComponent implements OnInit {
  props = constantsProps;
  addDoctorForm: FormGroup;
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
              private doctorService: DoctorService) {
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    } 

    this.addDoctorForm = this.formBuilder.group({
      doctorFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      doctorLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      doctorGender: ['', Validators.required],
      doctorMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      doctorPassword: ['', Validators.required],
      doctorReenterPassword: ['', Validators.required],
      doctorDesignation: ['', Validators.required],
      doctorDepartment: ['', Validators.required],
      doctorAvailablitityStatus: ['', Validators.required],
      doctorAvailableStartTime: [this.currentTime, Validators.required],
      doctorAvailableEndTime: ['', Validators.required],
      doctorAddress: ['', Validators.required],
      doctorProfileDescription: ['', Validators.required],
      doctorEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      doctorBirthDate: ['', Validators.required],
      doctorEducation: ['', Validators.required],
      doctorExpYears: ['', Validators.required],
      doctorPhoto: ['', Validators.required],
      doctorStatus: ['', Validators.required]      
    });
  }

  // For easy access to form fields
  get f() { return this.addDoctorForm.controls; }

  processFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imgFile = event.target.files[0];
      console.log(this.imgFile);
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
    if (this.addDoctorForm.invalid) {
        return;
    }
    if (this.f.doctorPassword.value !== this.f.doctorReenterPassword.value) {
      this.notifyService.showError('Passwords do not match.');
      return;
    }

    let userfirstname = this.f.doctorFirstname.value.charAt(0).toUpperCase() + this.f.doctorFirstname.value.slice(1).toLowerCase();
    let userlastname = this.f.doctorLastname.value.charAt(0).toUpperCase() + this.f.doctorLastname.value.slice(1).toLowerCase();
    var data = {
        RSDOCADDOP: {
            rs_ad_recin: {
                rs_doctor_first_name: userfirstname,
                rs_doctor_last_name: userlastname,
                rs_doctor_gender: this.f.doctorGender.value,
                rs_doctor_mobile: this.f.doctorMobile.value,
                rs_doctor_password: this.f.doctorPassword.value,
                rs_doctor_designation: this.f.doctorDesignation.value,
                rs_doctor_department: this.f.doctorDepartment.value,
                rs_doctor_profile_description: this.f.doctorProfileDescription.value,
                rs_doctor_address: this.f.doctorAddress.value,
                rs_doctor_email: this.f.doctorEmail.value,
                rs_doctor_available_status: this.f.doctorAvailablitityStatus.value,
                rs_doctor_available_start_time: this.datePipe.transform(this.f.doctorAvailableStartTime.value, 'HH::mm:ss'),
                rs_doctor_available_end_time: this.datePipe.transform(this.f.doctorAvailableEndTime.value, 'HH:mm:ss'),
                rs_doctor_birth_date: this.datePipe.transform(this.f.doctorBirthDate.value, 'YYYY-MM-dd'),
                rs_doctor_education: this.f.doctorEducation.value,
                rs_doctor_exp_years: this.f.doctorExpYears.value,
                rs_doctor_image: this.imgFile.name,
                rs_doctor_status: this.f.doctorStatus.value,
                rs_created_user_id: 1
            }
        }
    };
  
    console.log('===data====');
    console.log(data);
    

    var Imagedata = {
      file: this.imgFile
    };    

    console.log('===Imagedata====');
    console.log(Imagedata);

    this.doctorService.addDoctorsImage(Imagedata).subscribe((response: any) => {
      console.log('====add response=====');
      console.log(response);
      // if (response) {
      //   this.doctorService.addDoctors(data).subscribe((DocResponse: any) => {
      //     this.spinner.hide();
      //     console.log('====DocResponse=====');
      //     console.log(DocResponse);
      //     let getResponseObj = JSON.parse(JSON.stringify(DocResponse));
      //     console.log('====getResponseObj=====');
      //     console.log(getResponseObj);
      //     // console.log(getResponseObj);
      //     // if (getResponseObj != null && getResponseObj.responseData != null) {
      //     //    this.doctorsList = getResponseObj.responseData;
      //     //    console.log('====response=====');
      //     //    console.log(this.doctorsList);
      //     //    this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
      //     // } else {
      //     //    this.doctorsList = null;
      //     //    this.notifyService.showError(getResponseObj.responseMessage);
      //     // }
      //   });
      // } else {
      //   console.log("Error in the Creating Doctor.");
      // }
    });
  }
}
