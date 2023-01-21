import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dashboard } from 'src/models/Dashboard';
import { Graph } from 'src/models/Graph';
import { GraphService } from 'src/services/graph.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent implements OnInit {

  constructor(
    private dashboardService:DashboardService,
    private route: ActivatedRoute,
    private location: Location,
    private graphService:GraphService
    ) { }

  dashboard:Dashboard|undefined;
  graphs:Graph[]=[]

  ngOnInit(): void {
    this.getDashboard()
  }
  
  getDashboard(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dashboardService.getDashboard(id).subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.getGraphs()
    })
  }

  getGraphs(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.graphService.getGraphs(id).subscribe(graphs=>{this.graphs=graphs;console.log(this.graphs)})
  }

}
