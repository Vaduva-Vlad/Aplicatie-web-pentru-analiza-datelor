import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Dashboard } from 'src/models/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8000/api/dashboards"

  getDashboards():Observable<Dashboard[]>{
    return this.http.get<Dashboard[]>(this.url)
  }

  getDashboard(id:number):Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.url}/${id}`)
  }
}
