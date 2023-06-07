import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dashboard } from 'src/models/Dashboard';
import { Graph } from 'src/models/Graph';
import { GraphService } from 'src/services/graph.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AddGraphComponent } from '../add-graph/add-graph.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
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
    if(this.isAuthenticated())
      this.getDashboard()
  }
  
  isAuthenticated():boolean{
    return this.authenticationService.isAuthenticated()
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
    this.graphService.getGraphs(id).subscribe(graphs=>{this.graphs=graphs;})
  }

  openDialog(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const dialog=this.dialog.open(AddGraphComponent)
    dialog.componentInstance.dashboardId=id
  }

  whenDropped(event: CdkDragDrop<Graph[]>){

    //find a way to access the graph object from the chart component

    moveItemInArray(this.graphs, 0, 2);
    let element=event.container.element.nativeElement
    console.log(event)
  }

  //whenEntered(event:)
}
