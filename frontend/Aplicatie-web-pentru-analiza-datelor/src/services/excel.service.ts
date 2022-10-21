import { Injectable } from '@angular/core';
import { SingleRowData } from 'src/dataformats/SingleRowData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }
  url="localhost:8080/api/exceldata"

  getSingleRowData():Observable<SingleRowData>{
    return this.http.get<SingleRowData>(this.url)
  }
}
