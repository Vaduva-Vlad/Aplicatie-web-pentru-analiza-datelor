import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private snackbar:MatSnackBar) { }
  username:string|undefined
  password:string|undefined
  token:string|undefined
  user_id:string|undefined

  ngOnInit(): void {
  }

  login(){
    let data={"username":this.username,"password":this.password}
    if(this.password!?.length>0 && this.username!?.length>0){
      this.authenticationService.login(data).subscribe(
        response=>{this.authenticationService.saveUserData(response)},
        error=>{this.snackbar.open(error['error']['detail'],"",{
          duration:3000
        })}
      )
    }
    else{
      this.snackbar.open("Vă rugăm completați toate câmpurile!","",{
        duration:3000
      })
    }
  }

}
