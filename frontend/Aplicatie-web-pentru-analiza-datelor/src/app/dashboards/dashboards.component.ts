import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { Dashboard } from 'src/models/Dashboard';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  constructor(private dashboardService:DashboardService) { }
  dashboards:Dashboard[]|undefined

  ngOnInit(): void {
    this.getDashboards()
  }

  getDashboards(){
    this.dashboardService.getDashboards().subscribe(dashboards=>{
      this.dashboards=dashboards
    })
  }

}
