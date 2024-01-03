import { Component, OnInit } from '@angular/core';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { SettingService } from '../../adminpanel/dashboard/setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  props = constantsProps;
  currentUserName: String;
  currentUserEmail: String;
  currentUser: any;
  patientData: any;

  constructor(public spinner: NgxSpinnerService, 
    public notifyService: NotificationmsgService, 
    private router: Router,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    } else {
      this.getPatientDashboardData();
    }
  }

  getPatientDashboardData() {
    this.spinner.show();
    var data = {
      GetPatientDashBoard: {
        rs_add_recin: {
          rs_user_id: this.currentUser.id
        }
      }
    };
    this.settingService.getPatientDashboardData(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log('patient data===');
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
         this.patientData = getResponseObj.responseData;
      } else {
         this.patientData = null;
         this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }
}
