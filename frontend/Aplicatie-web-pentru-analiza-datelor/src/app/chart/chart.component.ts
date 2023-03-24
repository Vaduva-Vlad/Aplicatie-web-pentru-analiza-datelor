import { Component, Input, OnInit } from '@angular/core';
import { Graph } from 'src/models/Graph';
import { EChartsOption } from 'echarts'; 
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';

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
  }

  setOption(){
    this.option=<EChartsOption>this.graph?.option
  }

  dragEnd($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
}

}
