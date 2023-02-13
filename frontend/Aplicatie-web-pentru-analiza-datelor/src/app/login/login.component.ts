import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }
  username:string|undefined
  password:string|undefined
  token:string|undefined
  user_id:string|undefined

  ngOnInit(): void {
  }

  login(){
    let data={"username":this.username,"password":this.password}
    this.authenticationService.login(data).subscribe(response=>this.authenticationService.saveUserData(response))
  }

}
