import { Injectable } from '@angular/core';
import { Data } from 'src/dataformats/Data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8000/api/exceldata"

  getData():Observable<Data[]>{
    return this.http.get<Data[]>(this.url)
  }
}
