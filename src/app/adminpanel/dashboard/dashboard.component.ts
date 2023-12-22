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
  diseases_badge_colors = ["col-red", "col-green", "col-cyan", "col-orange", "col-purple"];

  appointmentList = [
    {id: 1, name: "John Doe", doctor: "Dr.Jacob Ryan", date: "12/05/2016", time: "2.00 PM", diseases: "Fever"},
    {id: 2, name: "Sarah Smith", doctor: "Dr.Rajesh", date: "12/05/2016", time: "2.00 PM", diseases: "Jaundice"},
    {id: 3, name: "Airi Satou", doctor: "Dr.Sarah Smith", date: "12/05/2016", time: "2.00 PM", diseases: "Cholera"},
    {id: 4, name: "Angelica Ramos", doctor: "Dr.Jay Soni", date: "12/05/2016", time: "2.00 PM", diseases: "Maleria"},
    {id: 5, name: "Ashton Cox", doctor: "Dr.Megha Trivedi", date: "12/05/2016", time: "2.00 PM", diseases: "Typhod"},
    {id: 6, name: "Cara Stevens", doctor: "Dr.Amit Trivedi", date: "12/05/2016", time: "2.00 PM", diseases: "Infection"}
  ];

  constructor(public spinner: NgxSpinnerService, 
    public notifyService: NotificationmsgService, 
    private router: Router,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser == null) {
      this.router.navigate(['/home']);
    } else {
      this.createChart();
      this.getDashboardData();
    }
  }

  getDashboardData() {
    this.spinner.show();
    this.settingService.getBookings().subscribe((response: any) => {
      this.spinner.hide();
      let getResponseObj = JSON.parse(JSON.stringify(response));
      console.log(getResponseObj);
      if (getResponseObj != null && getResponseObj.responseData != null) {
         this.bookingData = getResponseObj.responseData;
      } else {
         this.bookingData = null;
         this.notifyService.showError(getResponseObj.responseMessage);
      }
    });
  }

  createChart() {
    const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const yValues = [55, 49, 44, 24, 15, 40, 35];
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
