import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }

  private excelUrl = 'http://localhost:8000/api/exceldata';  

  getExcelData(): Observable<String> {
    return this.http.get<String>(`${this.excelUrl}`)
  }
}