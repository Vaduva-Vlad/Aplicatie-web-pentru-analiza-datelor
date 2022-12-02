import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dashboard } from 'src/models/Dashboard';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent implements OnInit {

  constructor(
    private dashboardService:DashboardService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  dashboard:Dashboard|undefined;

  ngOnInit(): void {
    this.getDashboard()
  }
  
  getDashboard(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dashboardService.getDashboard(id).subscribe(dashboard=>{this.dashboard=dashboard;console.log(dashboard.id)})
  }

}
