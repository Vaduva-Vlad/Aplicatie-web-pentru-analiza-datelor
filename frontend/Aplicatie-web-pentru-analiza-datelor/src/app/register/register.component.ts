import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }

  username:string|undefined
  email:string|undefined
  password:string|undefined

  ngOnInit(): void {
  }

  register(){
    let data={"username":this.username,"email":this.email,"password":this.password}
    this.authenticationService.register(data).subscribe(r=>this.authenticationService.login(data).subscribe(response=>this.authenticationService.saveUserData(response)))
    
  }

}
