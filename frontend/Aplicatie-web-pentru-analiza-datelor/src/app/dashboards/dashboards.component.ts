import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { Dashboard } from 'src/models/Dashboard';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddDashboardDialogComponent } from '../add-dashboard-dialog/add-dashboard-dialog.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  constructor(private dashboardService:DashboardService,public dialog: MatDialog) { }
  dashboards:Dashboard[]|undefined

  ngOnInit(): void {
    this.getDashboards()
  }

  getDashboards(){
    this.dashboardService.getDashboards().subscribe(dashboards=>{
      this.dashboards=dashboards
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDashboardDialogComponent)
  }
}
