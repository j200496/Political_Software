import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ChartComponent   // 👈 importa el ChartComponent real
} from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-charts',
  imports:[NgApexchartsModule, CommonModule],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
   total!: number;
  @ViewChild("chart") chart!: ChartComponent;  

public chartOptions: ChartOptions = {
  series: [{ name: 'Miembros', data: [] }],
  chart: { type: 'bar', height: 350 },
  xaxis: { categories: [] },
  title: { text: 'Miembros por territorio' }
};

  service = inject(PersonasService);
  router = inject(Router);

  ngOnInit(): void {
    this.service.TotalMiembros().subscribe(m =>{
      this.total = m;
    });
    this.CargarDatos();
  }

  CargarDatos(){
    this.service.Charts().subscribe((res) => {
      const categorias = res.map((x: any) => x.provincia);
      const cantidades = res.map((x: any) => x.cantidadMiembros);

      if (this.chart) {
        // refresca el chart ya renderizado
        this.chart.updateOptions({ xaxis: { categories: categorias } });
        this.chart.updateSeries([{ name: 'Miembros', data: cantidades }]);
      } else {
        // primera carga
        this.chartOptions = {
          series: [{ name: 'Miembros', data: cantidades }],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: categorias },
          title: { text: 'Miembros por territorio' }
        };
      }
    });
  }

 /* <apx-chart
  #chart
  [series]="chartOptions.series || []"   
  [chart]="chartOptions.chart"
  [xaxis]="chartOptions.xaxis"
  [title]="chartOptions.title">
</apx-chart>
*/
}
