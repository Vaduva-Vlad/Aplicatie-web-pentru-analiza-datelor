import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog,private authenticationService:AuthenticationService,private router:Router){}

  title = 'Aplicatie-web-pentru-analiza-datelor';
  opened=false;
  display=true;

  ngOnInit(): void {
    this.authenticated()
    let content=document.getElementById("content")
    let contentHeight=content!.clientHeight
    let contentOffset=content!.offsetTop
    let newHeight=String(contentHeight-contentOffset).concat("px")
    //content!.style.height=newHeight
  }

  openRegisterDialog(){
    const dialog=this.dialog.open(RegisterComponent)
  }

  openLoginDialog(){
    const dialog=this.dialog.open(LoginComponent)
  }

  authenticated(){
    if(this.authenticationService.isAuthenticated()){
      this.display=false
    }
  }

  isAuthenticated(){
    return this.authenticationService.isAuthenticated()
  }

  logout(){
    this.authenticationService.logout()
    this.router.navigate(['/home'])
    location.reload()
  }

  navigateHome(){
    this.router.navigate(['/home'])
  }
}
