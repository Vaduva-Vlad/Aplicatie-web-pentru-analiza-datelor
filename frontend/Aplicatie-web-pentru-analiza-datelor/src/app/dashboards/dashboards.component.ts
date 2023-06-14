import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { Dashboard } from 'src/models/Dashboard';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddDashboardDialogComponent } from '../add-dashboard-dialog/add-dashboard-dialog.component';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  constructor(private dashboardService:DashboardService,public dialog: MatDialog,private authenticationService:AuthenticationService) { }
  dashboards:Dashboard[]|undefined
  displayAddDashboard=false

  ngOnInit(): void {
    this.getDashboards()
    console.log(localStorage.getItem('user_id'))
  }

  getDashboards(){
    let user_id:number=parseInt(localStorage.getItem('user_id')!)
    this.dashboardService.getDashboards(user_id).subscribe(dashboards=>{
      this.dashboards=dashboards
    })
  }

  deleteDashboard(id:number){
    this.dashboardService.deleteGraph(id).subscribe(response=>location.reload())
  }

  addDashboardDialog(): void {
    this.displayAddDashboard=!this.displayAddDashboard
  }

  isAuthenticated():boolean{
    return this.authenticationService.isAuthenticated()
  }

  changeDisplay(value:boolean){
    this.displayAddDashboard=value
  }
}
