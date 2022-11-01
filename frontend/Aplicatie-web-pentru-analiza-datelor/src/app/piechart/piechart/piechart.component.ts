import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/services/excel.service';
import { SimpleData } from 'src/dataformats/SimpleData';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  constructor(private excelService:ExcelService) { }

  data:SimpleData[]=[]

  ngOnInit(): void {
    this.getData()
  }

  getData():void{
    this.excelService.getSimpleData().subscribe(data=>this.data=data)
  }

}
