import { Component, OnInit } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";
import { constantsProps } from '../../commonconfig/props/constants.props';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { SettingService } from '../../adminpanel/dashboard/setting.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  props = constantsProps;
  currentUserName: String ;
  currentUserEmail: String ;
  chartdata: any;
  public chart: any;
  bookingData: any;
  malechartData: any;
  femalechartData: any;
  currentUser: any;
  diseases_badge_colors = ["col-red", "col-green", "col-cyan", "col-orange", "col-purple"];

  constructor(public spinner: NgxSpinnerService, 
    public notifyService: NotificationmsgService, 
    private router: Router,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    } else {
      this.getDashboardData();
    }
  }

  getDashboardData() {
    this.spinner.show();
    var data = {
      GetDoctorDashBoard: {
        rs_add_recin: {
          rs_doctor_id: "2"
        }
      }
    };
    this.settingService.getDoctorDashboardData(data).subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null) {
         this.bookingData = getResponseObj.responseData;
         let malechartData    = this.bookingData.MaleAppointments;
         let femalechartData  = this.bookingData.femaleAppointments;
         this.malechartData   = [malechartData['Monday'], malechartData['Tuesday'], malechartData['Wednesday'], malechartData['Thursday'], malechartData['Friday'], malechartData['Saturday'], malechartData['Sunday']];
         this.femalechartData = [femalechartData['Monday'], femalechartData['Tuesday'], femalechartData['Wednesday'], femalechartData['Thursday'], femalechartData['Friday'], femalechartData['Saturday'], femalechartData['Sunday']];
         this.createChart();
      } else {
         this.bookingData = null;
         this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  createChart() {
    const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const maleValues = this.malechartData;
    const femaleValues = this.femalechartData;
    const barColors = ['pink', 'darkorange', 'aqua', 'lightgreen', 'brown', 'gold', 'lightblue'];
    this.chart = new Chart('bookingChart', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [
          {
            label: '# of Male',
            data: maleValues,
            backgroundColor: 'rgba(124, 181, 236, 0.9)',
            borderColor: 'rgb(124, 181, 236)',
            borderWidth: 1,
            barThickness: 10,
            borderRadius: 15
          },
          {
            label: '# of Female',
            data: femaleValues,
            backgroundColor: 'rgb(154, 160, 172)',
            borderColor: 'rgb(67, 67, 72)',
            borderWidth: 1,
            barThickness: 10,
            borderRadius: 15
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 30,
            },
            min: 0,
            max: 120
          }
        }
      }
    });
  }
}
