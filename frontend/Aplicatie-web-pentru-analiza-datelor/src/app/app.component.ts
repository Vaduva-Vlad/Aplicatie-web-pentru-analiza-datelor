import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog){}

  title = 'Aplicatie-web-pentru-analiza-datelor';
  opened=false;

  openDialog(){
    const dialog=this.dialog.open(RegisterComponent)
  }
}
