import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/services/excel.service';
import { Data } from 'src/dataformats/Data';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  constructor(private excelService:ExcelService) { }

  data:Data[]=[]
  converted_data:Object[]=[]

  chartOption:EChartsOption={}

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
    this.excelService.getData().subscribe(data=>{
      this.data=data;
      this.converted_data=this.convertData();
      this.createChartOption();
    });
  }

  convertData(){
    var result:Object[]=[];
    for(let i=0;i<this.data.length;i++){
      result.push({value:this.data[i].data, name:this.data[i].name});
      console.log({value:this.data[i].data, name:this.data[i].name})
    }
    return result;
  }

  createChartOption(){
    this.chartOption={
      responsive: true,
      title: {
        text: 'Values over the years',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Data',
          type: 'pie',
          radius: '50%',
          data: this.converted_data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

}
