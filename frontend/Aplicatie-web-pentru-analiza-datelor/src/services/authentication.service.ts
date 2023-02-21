import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { keyable } from 'src/models/keyable';
import { JwtService } from 'src/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  register_url="http://localhost:8000/api/signup"
  login_url="http://localhost:8000/api/login"

  constructor(private http:HttpClient,private jwtService:JwtService) { }

  register(data:Object):Observable<Object>{
    return this.http.post<Object>(this.register_url,data)
  }

  login(data:Object):Observable<string>{
    return this.http.post<string>(this.login_url,data)
  }

  saveUserData(response:string){
      let token=response
      let user_id=this.decodeToken(response)['user_id']
      localStorage.setItem("token",token)
      localStorage.setItem("user_id",user_id!)
      location.reload()
  }

  decodeToken(token:string):keyable{
    return this.jwtService.decodeToken(token)
  }

  logout(){
    localStorage.setItem("token","")
    localStorage.setItem("user_id","")
  }

  isAuthenticated():boolean{
    let token=localStorage.getItem("token")
    return token!="" && token!=null
  }
}
