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
  selector: 'assignee-graph',
  templateUrl: './assignee-graph.component.html',
})

export class AssigneeGraphComponent {
  @ViewChild("assigneeChart") assigneeChart!: ChartComponent;
  public assigneeChartOptions!: ChartOptions;
  
  constructor() {
    this.assigneeChartOptions = {
      series: [
        {
          name: "Unassigned Tasks",
          data: [5, 3, 6, 2, 7, 4, 8]
        },
        {
          name: "Alice",
          data: [10, 12, 15, 20, 18, 22, 25]
        },
        {
          name: "Bob",
          data: [8, 10, 7, 14, 12, 10, 18]
        },
        {
          name: "Charlie",
          data: [5, 8, 6, 10, 9, 12, 10]
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
