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
  selector: 'workload-graph',
  templateUrl: './workload-graph.component.html',
})
export class WorkloadGraphComponent {
  @ViewChild("workloadChart") workloadChart!: ChartComponent;
  public workloadChartOptions!: ChartOptions;
  
  constructor() {
    this.workloadChartOptions = {
      series: [
        {
          name: "Unassigned Tasks",
          data: [3]
        },
        {
          name: "In Progress",
          data: [13]
        },
        {
          name: "Completed",
          data: [8]
        }
      ],
      chart: {
        type: "bar",
        height: 120,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      xAxis: {
        categories: [
          "Tasks"
        ]
      }
    };
  }
}
