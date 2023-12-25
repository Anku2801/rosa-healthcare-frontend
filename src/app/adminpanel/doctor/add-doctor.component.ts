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

     // Get details
     this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
      let editDoctorData = res;

      console.log('editDoctorDatabnnnnnnnnnn====');
      console.log(editDoctorData);
      if(editDoctorData && (editDoctorData != null) && (editDoctorData.gender)) {
        this.editDoctorId = editDoctorData.id;
        this.addDoctorForm.controls.userFirstname.setValue(editDoctorData.user.first_name);
        this.addDoctorForm.controls.userLastname.setValue(editDoctorData.user.last_name);
        this.addDoctorForm.controls.userGender.setValue(editDoctorData.gender);
        this.addDoctorForm.controls.userMobile.setValue(editDoctorData.user.phone_no);
        this.addDoctorForm.controls.userBirthDate.setValue(new Date(editDoctorData.birth_date));
        this.addDoctorForm.controls.userAge.setValue(editDoctorData.age);
        this.addDoctorForm.controls.userEmail.setValue(editDoctorData.user.email);
        this.addDoctorForm.controls.doctorId.setValue(editDoctorData.doctor.id);
        this.addDoctorForm.controls.userMaritalStatus.setValue(editDoctorData.marital_status);
        this.addDoctorForm.controls.userAddress.setValue(editDoctorData.address);
        this.addDoctorForm.controls.userBloodGroup.setValue(editDoctorData.blood_group);
        this.addDoctorForm.controls.userBloodPresure.setValue(editDoctorData.blood_presure);
        this.addDoctorForm.controls.userSugger.setValue(editDoctorData.sugger);
        this.addDoctorForm.controls.userInjury.setValue(editDoctorData.injury);
        this.addDoctorForm.controls.userStatus.setValue(editDoctorData.user.status); 
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
    if (this.f.doctorPassword.value !== this.f.doctorReenterPassword.value) {
      this.notifyService.showError('Passwords do not match.');
      return;
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
                rs_doctor_available_start_time: this.datePipe.transform(this.f.doctorAvailableStartTime.value, 'HH::mm:ss'),
                rs_doctor_available_end_time: this.datePipe.transform(this.f.doctorAvailableEndTime.value, 'HH:mm:ss'),
                rs_doctor_birth_date: this.datePipe.transform(this.f.doctorBirthDate.value, 'YYYY-MM-dd'),
                rs_doctor_education: this.f.doctorEducation.value,
                rs_doctor_exp_years: this.f.doctorExpYears.value,
                rs_doctor_image: this.imgFile.name,
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

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.imgFile, this.imgFile.name);

    this.doctorService.addDoctorsImage(uploadImageData).subscribe((response: any) => {
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
          this.doctorService.addDoctors(data).subscribe((DocResponse: any) => {
          this.spinner.hide();
          let getResponseObj = JSON.parse(JSON.stringify(DocResponse));
          if (getResponseObj != null && getResponseObj.responseData != null && getResponseObj.responseStatus == "Success") {
            this.notifyService.showSuccess(getResponseObj.responseMessage);
            this.addDoctorForm.reset();
            this.router.navigate(['/admin/doctors']);
          } else {
             this.notifyService.showError(getResponseObj.responseMessage);
          }
        });
      } else {
        this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
