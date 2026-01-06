import { Component,inject, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import {NgApexchartsModule} from "ng-apexcharts"
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { PersonasService } from '../../services/personas.service';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries |any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
    colors: string[];  
};

@Component({
  selector: 'app-piechart',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {
 service = inject(PersonasService);

  @ViewChild("chart") chart!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.GetTotalMiembros();
  }

  GetTotalMiembros() {
    this.service.GetMiembrosPorGenero().subscribe(res => {
      const genero = res.map((x: any) => x.genero);
      const cantidades = res.map((x: any) => x.cantidad);

      if (this.chart) {
        // actualizar chart ya renderizado
        this.chart.updateOptions({
          labels: genero
        });

        this.chart.updateSeries(cantidades);
      } 
      else {
        // primera carga
        this.chartOptions = {
          series: cantidades,
          chart: {
            type: 'pie',
            width: 380
          },
          labels: genero,
           colors: ['#fca739ff', '#6efa52ee'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: { width: 200 },
              legend: { position: 'bottom' }
            }
          }]
        };
      }
    });
  }
}
