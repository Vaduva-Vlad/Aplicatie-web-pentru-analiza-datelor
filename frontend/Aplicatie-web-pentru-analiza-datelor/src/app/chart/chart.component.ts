import { Component, Input, OnInit } from '@angular/core';
import { Graph } from 'src/models/Graph';
import { EChartsOption } from 'echarts'; 

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  @Input() graph:Graph|undefined
  option:EChartsOption={}

  ngOnInit(): void {
    this.setOption()
    console.log(this.graph)
  }

  setOption(){
    this.option=<EChartsOption>this.graph?.option
    console.log(this.option)
  }

}
