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

  getDashboards(user_id:number):Observable<Dashboard[]>{
    return this.http.get<Dashboard[]>(`${this.url}/${user_id}`)
  }

  getDashboard(id:number):Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.url}/${id}`)
  }

  addDashboard(dashboard:Dashboard){
    return this.http.post<Dashboard>(this.url,dashboard).subscribe({
      next: data => {
        console.log('Add successful for issue #', data);
        window.location.reload();
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
  }
}
