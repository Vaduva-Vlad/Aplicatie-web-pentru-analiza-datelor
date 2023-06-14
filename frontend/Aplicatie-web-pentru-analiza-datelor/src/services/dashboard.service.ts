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
  single_url="http://localhost:8000/api/dashboard"

  getDashboards(user_id:number):Observable<Dashboard[]>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.get<Dashboard[]>(`${this.url}/${user_id}`,httpOptions)
  }

  getDashboard(id:number):Observable<Dashboard>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.get<Dashboard>(`${this.single_url}/${id}`,httpOptions)
  }

  addDashboard(dashboard:Object):Observable<Dashboard>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.post<Dashboard>(this.single_url,dashboard,httpOptions)
  }

  deleteGraph(id:number):Observable<unknown>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.delete(`${this.single_url}/${id}`,httpOptions)
  }
}
