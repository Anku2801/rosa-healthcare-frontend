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
    {id: 1, name: "John Doe", gender: "Male", date: "12/05/2016", time: "2.00 PM", diseases: "Fever"},
    {id: 2, name: "Sarah Smith", gender: "Female", date: "12/05/2016", time: "2.00 PM", diseases: "Jaundice"},
    {id: 3, name: "Airi Satou", gender: "Male", date: "12/05/2016", time: "2.00 PM", diseases: "Cholera"},
    {id: 4, name: "Angelica Ramos", gender: "Female", date: "12/05/2016", time: "2.00 PM", diseases: "Maleria"},
    {id: 5, name: "Ashton Cox", gender: "Male", date: "12/05/2016", time: "2.00 PM", diseases: "Typhod"},
    {id: 6, name: "Cara Stevens", gender: "Female", date: "12/05/2016", time: "2.00 PM", diseases: "Infection"}
  ];

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const maleValues = [55, 49, 44, 24, 65, 40, 35];
    const femaleValues = [65, 19, 54, 114, 15, 80, 15];
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
