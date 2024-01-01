import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { SettingService } from './setting.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  props = constantsProps;
  chartdata: any;
  currentUser: any;
  currentUserName: String ;
  currentUserEmail: String ;
  public chart: any;
  bookingData: any;
  chartData: any;
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
    this.settingService.getBookings().subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      if (getResponseObj != null && getResponseObj.responseData != null) {
         this.bookingData = getResponseObj.responseData;
         let chartData    = this.bookingData.bookingsByWeekdays;
         this.chartData   = [chartData['Monday'], chartData['Tuesday'], chartData['Wednesday'], chartData['Thursday'], chartData['Friday'], chartData['Saturday'], chartData['Sunday']];
         this.createChart();
      } else {
         this.bookingData = null;
         this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  createChart() {
    const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const yValues = this.chartData;
    const barColors = ['pink', 'darkorange', 'aqua', 'lightgreen', 'brown', 'gold', 'lightblue'];
    this.chart = new Chart('bookingChart', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [
          {
            label: '# of Appointments',
            data: yValues,
            backgroundColor: barColors,
            borderColor: ['fuchsia', 'brown', 'blue', 'green', 'red', 'black', 'navy'],
            borderWidth: 2,
            barThickness: 18,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 30
            },
            min: 0,
            max: 120
          }
        }
      }
    });
  }
}
