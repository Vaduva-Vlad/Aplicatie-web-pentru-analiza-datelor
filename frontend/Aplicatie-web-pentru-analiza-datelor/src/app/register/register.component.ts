import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private snackbar:MatSnackBar) { }

  username:string|undefined
  email:string|undefined
  password:string|undefined

  ngOnInit(): void {
  }

  register(){
    let data={"username":this.username,"email":this.email,"password":this.password}
    if(this.username!?.length>0 && this.email!?.length>0 && this.password!?.length>0){
      this.authenticationService.register(data).subscribe(r=>this.authenticationService.login(data).subscribe(response=>this.authenticationService.saveUserData(response)))
    }
    else{
      this.snackbar.open("Există deja un utilizator cu acest e-mail sau nu ați completat toate câmpurile.","",{
        duration:3000
      })
    }
  }

}
