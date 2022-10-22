import { Injectable } from '@angular/core';
import { SingleRowData } from 'src/dataformats/SingleRowData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8000/api/exceldata"

  getSingleRowData(){
    return this.http.get<SingleRowData[]>(this.url)
  }
}
