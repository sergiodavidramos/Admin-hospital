import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() grafica;
  leyenda:string="";
    // Doughnut
    public doughnutChartLabels: string[] = [""];
    public doughnutChartData: number[] = [
      350, 450, 100
      // [50, 150, 120],
      // [250, 130, 70],
    ];
    public doughnutChartType: string = 'doughnut';
    
    constructor() {}
    
    ngOnInit() {
      this.doughnutChartLabels=this.grafica.labels;
      this.doughnutChartData=this.grafica.data;
      this.doughnutChartType=this.grafica.type;
      this.leyenda=this.grafica.leyenda;
    }
}
