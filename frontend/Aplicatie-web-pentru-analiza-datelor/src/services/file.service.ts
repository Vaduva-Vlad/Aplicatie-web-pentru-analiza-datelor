import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8000/api/csvupload"

  uploadFile(file:File):Observable<Object>{
    let formData:FormData=new FormData()
    formData.append('file',file,file.name)
    return this.http.post<Object>(this.url,formData)
  }
}
