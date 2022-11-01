import { Injectable } from '@angular/core';
import { SimpleData } from 'src/dataformats/SimpleData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8000/api/exceldata"

  getSimpleData():Observable<SimpleData[]>{
    return this.http.get<SimpleData[]>(this.url)
  }
}
