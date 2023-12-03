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
  diseases_badge_colors = ["col-red", "col-green", "col-cyan", "col-orange", "col-purple"];

  appointmentList = [
    {id: 1, name: "John Doe", doctor: "Dr.Jacob Ryan", date: "12/05/2016", time: "2.00 PM", diseases: "Fever"},
    {id: 2, name: "Sarah Smith", doctor: "Dr.Rajesh", date: "12/05/2016", time: "2.00 PM", diseases: "Jaundice"},
    {id: 3, name: "Airi Satou", doctor: "Dr.Sarah Smith", date: "12/05/2016", time: "2.00 PM", diseases: "Cholera"},
    {id: 4, name: "Angelica Ramos", doctor: "Dr.Jay Soni", date: "12/05/2016", time: "2.00 PM", diseases: "Maleria"},
    {id: 5, name: "Ashton Cox", doctor: "Dr.Megha Trivedi", date: "12/05/2016", time: "2.00 PM", diseases: "Typhod"},
    {id: 6, name: "Cara Stevens", doctor: "Dr.Amit Trivedi", date: "12/05/2016", time: "2.00 PM", diseases: "Infection"}
  ];

  constructor() { }

  ngOnInit(): void {
    this.createChart();
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
              stepSize: 30,
              // callback: function(value, index) {
              //   return '$' + value;
              // }
            },
            min: 0,
            max: 120
          }
        }
      }
    });
  }
}
