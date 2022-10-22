import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleRowData } from 'src/dataformats/SingleRowData';
import { ExcelService } from 'src/services/excel.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  constructor(private excelService:ExcelService) { }

  data:SingleRowData[]=[]

  getExcelData(){
    this.excelService.getSingleRowData().subscribe((response)=>{
      this.data=response;
      console.log(this.data);
    });
  }

  ngOnInit(): void {
    this.getExcelData()
  }

}
