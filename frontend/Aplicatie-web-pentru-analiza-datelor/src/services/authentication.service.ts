import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  register_url="http://localhost:8000/api/signup"
  login_url="http://localhost:8000/api/login"

  constructor(private http:HttpClient) { }

  register(data:Object):Observable<Object>{
    return this.http.post<Object>(this.register_url,data)
  }

  login(data:Object):Observable<Object>{
    return this.http.post<Object>(this.login_url,data)
  }

}
