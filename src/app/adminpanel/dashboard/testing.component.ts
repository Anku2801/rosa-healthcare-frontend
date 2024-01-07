import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DatePipe } from '@angular/common';
// import { NgxSpinnerService } from "ngx-spinner";
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { CommonService } from 'app/commonconfig/service/common.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DoctorService } from '../doctor/doctor.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html'
})
export class TestComponent implements OnInit {
  props = constantsProps;
  submitted: boolean = false;
  addImgForm:  FormGroup;
  currentUserRole: any;
  selectedFile: any;

  constructor(private formBuilder: FormBuilder,
              // private router: Router,
              // private activatedRoute: ActivatedRoute,
              // private spinner: NgxSpinnerService,
              // private notifyService: NotificationmsgService,
              private commonService: CommonService,
              private doctorService: DoctorService) {
              }

  ngOnInit() {
    this.addImgForm = this.formBuilder.group({
      doctorPhoto: ['', '']     
    });
  }

  // For easy access to form fields
  get f() { return this.addImgForm.controls; }


  handleImages(event: any) {
    console.log('innnnnnnnnnn');
    this.selectedFile = event.target.files[0];
    let formData = new FormData();
    formData.append("imageFile", this.selectedFile);
    console.log(this.selectedFile);
    this.doctorService.addUploadImage(formData).subscribe((response: any) => {
      console.log('upload---');
      let getResponseObj = JSON.parse(JSON.stringify(response));
      // if (getResponseObj != null && getResponseObj.responseStatus == "Success") {
      //   checkImagSuccess = true;
      // } else {
      //   this.spinner.hide();
      //   checkImagSuccess = false;
      //   this.notifyService.showError(getResponseObj.responseMessage);
      // }
    })
  }
}
