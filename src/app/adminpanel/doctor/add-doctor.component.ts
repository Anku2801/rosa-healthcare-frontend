import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DoctorService } from './doctor.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { map } from 'rxjs';

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
  imgFile: File;
  currentTime= new Date();
  currentUser: any;
  editDoctorId: any;
  services: any;
  maxDate: Date;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private notifyService: NotificationmsgService,
              private commonService: CommonService,
              private doctorService: DoctorService) {
                this.maxDate = new Date();
                this.dateConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-dark-blue', showWeekNumbers: false })
              }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    } 

    this.getServices();

    this.addDoctorForm = this.formBuilder.group({
      doctorFirstname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      doctorLastname: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      doctorGender: ['', Validators.required],
      doctorMobile: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      doctorPassword: ['', ''],
      doctorReenterPassword: ['', ''],
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
      doctorPhoto: ['', ''],
      doctorStatus: ['', Validators.required]      
    });

     // Get details
     this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
      let editDoctorData = res;

      console.log('editDoctorDatabnnnnnnnnnn====');
      console.log(editDoctorData);
      if(editDoctorData && (editDoctorData != null) && (editDoctorData.gender)) {
        console.log('innnnnnnnnnnnnnn====');

        this.editDoctorId = editDoctorData.id;
        let startTime = editDoctorData.available_start_time;
        const startTimeArray = startTime.split(":").map((time) => +time);
        const starttime = new Date();
        starttime.setHours(startTimeArray[0]);
        starttime.setMinutes(startTimeArray[1]);
        let endTime = editDoctorData.available_end_time;
        const endTimesArray = endTime.split(":").map((time) => +time);
        const endtime = new Date();
        endtime.setHours(endTimesArray[0]);
        endtime.setMinutes(endTimesArray[1]);
        this.addDoctorForm.controls.doctorFirstname.setValue(editDoctorData.user.first_name);
        this.addDoctorForm.controls.doctorLastname.setValue(editDoctorData.user.last_name);
        this.addDoctorForm.controls.doctorGender.setValue(editDoctorData.gender);
        this.addDoctorForm.controls.doctorMobile.setValue(editDoctorData.user.phone_no);
        this.addDoctorForm.controls.doctorDesignation.setValue(new Date(editDoctorData.birth_date));
        this.addDoctorForm.controls.doctorDesignation.setValue(editDoctorData.designation);
        this.addDoctorForm.controls.doctorDepartment.setValue(editDoctorData.department.id);
        this.addDoctorForm.controls.doctorAvailablitityStatus.setValue(editDoctorData.available_status);
        this.addDoctorForm.controls.doctorAvailableStartTime.setValue(starttime);
        this.addDoctorForm.controls.doctorAvailableEndTime.setValue(endtime);
        this.addDoctorForm.controls.doctorAddress.setValue(editDoctorData.address);
        this.addDoctorForm.controls.doctorProfileDescription.setValue(editDoctorData.description);
        this.addDoctorForm.controls.doctorEmail.setValue(editDoctorData.user.email);
        this.addDoctorForm.controls.doctorBirthDate.setValue(new Date(editDoctorData.birth_date));
        this.addDoctorForm.controls.doctorEducation.setValue(editDoctorData.education);
        this.addDoctorForm.controls.doctorExpYears.setValue(editDoctorData.exp_years);
        this.addDoctorForm.controls.doctorPhoto.setValue(editDoctorData.image); 
        this.addDoctorForm.controls.doctorStatus.setValue(editDoctorData.user.status);
      }
    })
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

  getServices() {
    this.spinner.show();
    var data = {
      GetDepartmentOperation: {
        rs_add_recin: {
        }
      }
    };

    this.commonService.getDepartments(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
        this.services = getResponseObj.responseData;
      } else {
        this.services = null;
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  // For adding a new doctor
  addDoctor() {
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addDoctorForm.invalid) {
        return;
    }

    if (this.editDoctorId) {
      if (((this.f.doctorPassword.value != '') || (this.f.doctorReenterPassword.value != '')) && (this.f.doctorPassword.value !== this.f.doctorReenterPassword.value)) {
        this.notifyService.showError('Passwords do not match.');
        return;
      }
    } else {
      if (this.f.doctorPassword.value && this.f.doctorReenterPassword.value && (this.f.doctorPassword.value !== this.f.doctorReenterPassword.value)) {
        this.notifyService.showError('Passwords do not match.');
        return;
      }
    }
    

    this.spinner.show();

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
                rs_doctor_available_start_time: this.datePipe.transform(this.f.doctorAvailableStartTime.value, 'HH::mm'),
                rs_doctor_available_end_time: this.datePipe.transform(this.f.doctorAvailableEndTime.value, 'HH:mm'),
                rs_doctor_birth_date: this.datePipe.transform(this.f.doctorBirthDate.value, 'YYYY-MM-dd'),
                rs_doctor_education: this.f.doctorEducation.value,
                rs_doctor_exp_years: this.f.doctorExpYears.value,
                rs_doctor_image: (this.editDoctorId) ? (this.imgFile) ? this.imgFile.name : '': this.imgFile.name,
                rs_doctor_status: this.f.doctorStatus.value,
                rs_created_user_id: this.currentUser.id
            }
        }
    };

    if (this.editDoctorId) {
      data.RSDOCADDOP.rs_ad_recin['rs_doctor_id'] = this.editDoctorId;
    } else {
      data.RSDOCADDOP.rs_ad_recin['rs_doctor_id'] = '';
    }

    var checkImagSuccess = true;
    if (this.editDoctorId) {
      if (this.imgFile) {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.imgFile, this.imgFile.name);
        this.doctorService.addDoctorsImage(uploadImageData).subscribe((response: any) => {
          let getResponseObj = JSON.parse(JSON.stringify(response));
          if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
            checkImagSuccess = true;
          } else {
            this.spinner.hide();
            checkImagSuccess = false;
            this.notifyService.showError(getResponseObj.responseMessage);
          }
        });
      }
    } else {
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.imgFile, this.imgFile.name);
        this.doctorService.addDoctorsImage(uploadImageData).subscribe((response: any) => {
          let getResponseObj = JSON.parse(JSON.stringify(response));
          if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
            checkImagSuccess = true;
          } else {
            this.spinner.hide();
            checkImagSuccess = false;
            this.notifyService.showError(getResponseObj.responseMessage);
          }
        });
    }
 
    if (checkImagSuccess) {
      this.doctorService.addDoctors(data).subscribe((DocResponse: any) => {
        this.spinner.hide();
        let getResponseObj = JSON.parse(JSON.stringify(DocResponse));
        if (getResponseObj != null && getResponseObj.responseData != null && getResponseObj.responseStatus == "Success") {
          this.notifyService.showSuccess(getResponseObj.responseMessage);
          this.addDoctorForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admin/doctors']);
          }, 900)
        } else {
            this.notifyService.showError(getResponseObj.responseMessage);
        }
      });
    }
  }
}
