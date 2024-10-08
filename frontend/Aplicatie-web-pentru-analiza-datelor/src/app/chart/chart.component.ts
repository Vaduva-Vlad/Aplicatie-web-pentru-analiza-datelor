import { Component, Input, OnInit } from '@angular/core';
import { Graph } from 'src/models/Graph';
import { EChartsOption } from 'echarts'; 
import { GraphService } from 'src/services/graph.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private graphService:GraphService) { }

  @Input() graph:Graph|undefined
  option:EChartsOption={}
  graphId:number|undefined

  ngOnInit(): void {
    this.setOption()
  }

  setOption(){
    this.option=<EChartsOption>this.graph?.option
    this.graphId=this.graph?.id
  }

  deleteGraph(){
    this.graphService.deleteGraph(this.graphId!,this.graph?.dashboard_id!).subscribe(response=>location.reload())
  }

}
