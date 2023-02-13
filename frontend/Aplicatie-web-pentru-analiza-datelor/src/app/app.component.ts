import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog,private authenticationService:AuthenticationService){}

  title = 'Aplicatie-web-pentru-analiza-datelor';
  opened=false;
  display=true;

  ngOnInit(): void {
    this.authenticated()
  }

  openRegisterDialog(){
    const dialog=this.dialog.open(RegisterComponent)
  }

  openLoginDialog(){
    const dialog=this.dialog.open(LoginComponent)
  }

  authenticated(){
    let token=localStorage.getItem("token")
    if(token!="" && token!=null){
      this.display=false
    }
  }

  logout(){
    this.authenticationService.logout()
    location.reload()
  }
}
