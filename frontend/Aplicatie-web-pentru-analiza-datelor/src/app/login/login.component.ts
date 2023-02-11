import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { JwtService } from 'src/services/jwt.service';
import { keyable } from 'src/models/keyable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private jwtService:JwtService) { }
  username:string|undefined
  password:string|undefined
  token:string|undefined
  user_id:string|undefined

  ngOnInit(): void {
  }

  login(){
    let data={"username":this.username,"password":this.password}
    this.authenticationService.login(data).subscribe(response=>{
      this.token=response
      this.user_id=this.decodeToken(response)['user_id']
      localStorage.setItem("token",this.token)
      localStorage.setItem("user_id",this.user_id!)
    })
    
  }

  decodeToken(token:string):keyable{
    return this.jwtService.decodeToken(token)
  }

}
