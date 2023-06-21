import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8000/api"

  uploadFile(file:File,dashboard_id:number,graph_id:number,data_source:string):Observable<Object>{
    let formData:FormData=new FormData()
    file = new File([file],`${dashboard_id}_${graph_id}.${data_source}`)
    formData.append('file',file,file.name)
    return this.http.post<Object>(`${this.url}/fileupload`,formData)
  }

  sendSelectedColumns(data:Object):Observable<Object>{
    return this.http.post<Object>(`${this.url}/columns`,data)
  }
}
