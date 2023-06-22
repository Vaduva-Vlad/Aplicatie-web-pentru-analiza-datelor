import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'src/services/dashboard.service';

@Component({
  selector: 'app-add-dashboard-dialog',
  templateUrl: './add-dashboard-dialog.component.html',
  styleUrls: ['./add-dashboard-dialog.component.scss']
})
export class AddDashboardDialogComponent implements OnInit {

  constructor(private dashboardService:DashboardService) { }
  @Output() closed = new EventEmitter<boolean>();
  dashboardName:string|undefined

  ngOnInit(): void {
  }

  close(){
    this.closed.emit(false)
  }

  addDashboard(){
    let user_id=localStorage.getItem("user_id")
    let data={"user_id":user_id,"name":this.dashboardName!}
    this.dashboardService.addDashboard(data).subscribe(response=>location.reload())
  }
}
