import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xAxis: ApexXAxis;
};

@Component({
  selector: 'admin-project-overview-assignee-graph',
  templateUrl: './admin-project-overview-assignee-graph.component.html',
})

export class AdminProjectOverviewAssigneeGraphComponent {
  @ViewChild("assigneeChart") assigneeChart!: ChartComponent;
  public assigneeChartOptions!: ChartOptions;
  
  constructor() {
    this.assigneeChartOptions = {
      series: [
        {
          name: "Unassigned Tasks",
          data: [5, 3, 6, 2, 7, 4, 8] // Example data for unassigned tasks for each day
        },
        {
          name: "Alice",
          data: [10, 12, 15, 20, 18, 22, 25] // Example data for tasks assigned to Alice
        },
        {
          name: "Bob",
          data: [8, 10, 7, 14, 12, 10, 18] // Example data for tasks assigned to Bob
        },
        {
          name: "Charlie",
          data: [5, 8, 6, 10, 9, 12, 10] // Example data for tasks assigned to Charlie
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: false,
      },
      xAxis: {
        categories: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ]
      }
    };
  }
}
