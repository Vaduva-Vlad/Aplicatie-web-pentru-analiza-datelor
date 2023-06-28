import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dashboard } from 'src/models/Dashboard';
import { Graph } from 'src/models/Graph';
import { GraphService } from 'src/services/graph.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddGraphComponent } from '../add-graph/add-graph.component';
import { AuthenticationService } from 'src/services/authentication.service';

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
    private graphService:GraphService,
    private dialog:MatDialog,
    private authenticationService:AuthenticationService
    ) { }

  dashboard:Dashboard|undefined;
  graphs:Graph[]=[]

  ngOnInit(): void {
    this.getDashboard()
  }
  
  // Verificăm dacă utilizatorul este autentificat și dacă dashboard-ul îi aparține
  isAuthenticated():boolean{
    let current_user=parseInt(localStorage.getItem('user_id')!)
    return this.authenticationService.isAuthenticated() && current_user==this.dashboard?.user_id
  }

  getDashboard(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dashboardService.getDashboard(id).subscribe(dashboard=>{
      this.dashboard=dashboard;
      this.getGraphs()
    })
  }

  getGraphs(){
    let user_id=parseInt(localStorage.getItem("user_id")!)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.graphService.getGraphs(id,user_id).subscribe(graphs=>{this.graphs=graphs;})
  }

  openDialog(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const dialog=this.dialog.open(AddGraphComponent)
    dialog.componentInstance.dashboardId=id
  }
}
