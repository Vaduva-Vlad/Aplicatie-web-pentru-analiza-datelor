import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardsComponent } from './dashboards/dashboards.component';

const routes: Routes = [
  {path:'home', component:DashboardsComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'dashboard/:id',component:DashboardDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
