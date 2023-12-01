import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { constantsProps } from 'app/commonconfig/props/constants.props';

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
  datePipe = new DatePipe("en-US");
  todayDate = this.datePipe.transform(new Date(), 'MMMM, YYYY');
  chartdata: any;
  public chart: any;

  constructor() { }

  ngOnInit(): void {
    // this.createChart();
  }

  // createChart() {
  //   const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  //   const yValues = [55, 49, 44, 24, 15, 40, 35];
  //   const barColors = ['pink', 'darkorange', 'aqua', 'lightgreen', 'brown', 'gold', 'lightblue'];
  //   this.chart = new Chart('bookingChart', {
  //     type: 'bar',
  //     data: {
  //       labels: xValues,
  //       datasets: [
  //         {
  //           label: '# of appointments',
  //           data: yValues,
  //           backgroundColor: barColors,
  //           borderColor: ['fuchsia', 'brown', 'blue', 'green', 'red', 'black', 'navy'],
  //           borderWidth: 2,
  //           barThickness: 24,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         y: {
  //           ticks: {
  //             stepSize: 30,
  //             // callback: function(value, index) {
  //             //   return '$' + value;
  //             // }
  //           },
  //           min: 0,
  //           max: 120
  //         }
  //       }
  //     }
  //   });
  // }
}
