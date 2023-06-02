import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph } from 'src/models/Graph';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8000/api/graphs"

  getGraphs(dashboard_id:number):Observable<Graph[]>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.get<Graph[]>(`${this.url}/${dashboard_id}`,httpOptions)
  }

  addGraph(data:Object):Observable<number>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.post<number>(this.url,data,httpOptions)
  }

  deleteGraph(graph_id:number,dashboard_id:number):Observable<unknown>{
    let httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      })
    }
    return this.http.delete(`${this.url}/${graph_id}/${dashboard_id}`,httpOptions)
  }
}
