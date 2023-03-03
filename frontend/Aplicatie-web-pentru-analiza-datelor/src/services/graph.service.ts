import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph } from 'src/models/Graph';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8000/api/graphs"

  getGraphs(dashboard_id:number):Observable<Graph[]>{
    return this.http.get<Graph[]>(`${this.url}/${dashboard_id}`)
  }

  addGraph(data:Object):Observable<Graph>{
    return this.http.post<Graph>(this.url,data)
  }
}
