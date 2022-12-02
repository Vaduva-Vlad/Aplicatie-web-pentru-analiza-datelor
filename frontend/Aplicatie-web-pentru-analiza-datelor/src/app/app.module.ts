import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PiechartComponent } from './piechart/piechart/piechart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LinechartComponent } from './linechart/linechart.component';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardsComponent } from './dashboards/dashboards.component'
import {MatListModule} from '@angular/material/list';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    PiechartComponent,
    LinechartComponent,
    DashboardsComponent,
    DashboardDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
