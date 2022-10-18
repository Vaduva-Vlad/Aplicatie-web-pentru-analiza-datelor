import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcelService } from './excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Aplicatie-web-pentru-analiza-datelor';
  constructor(private excelService:ExcelService){}
  data:String=''

  getData():void{
    this.excelService.getExcelData().subscribe(data=>this.data=data); 
  }

  ngOnInit(): void {
    this.getData();
  }
}
