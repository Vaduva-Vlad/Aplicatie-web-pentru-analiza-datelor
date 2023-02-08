import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  register_url="http://localhost:8000/api/signup"

  constructor(private http:HttpClient) { }

  register(data:Object):Observable<Object>{
    return this.http.post<Object>(this.register_url,data)
  }

}
