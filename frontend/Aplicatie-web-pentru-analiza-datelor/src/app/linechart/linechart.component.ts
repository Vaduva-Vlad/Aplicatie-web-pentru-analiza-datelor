import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/services/excel.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  constructor(private excelService:ExcelService) { }

  data:{}[]=[]
  //converted_data:Object[]=[]

  chartOption:EChartsOption={}

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
    this.excelService.getData().subscribe(data=>{
      this.data=data;
      //this.converted_data=this.convertData()
      this.createChartOption();
    });
  }

  createChartOption(){
    this.chartOption={
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }
  }

}
