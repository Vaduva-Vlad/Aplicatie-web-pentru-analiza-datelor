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
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { ChartComponent } from './chart/chart.component';
import { AddDashboardDialogComponent } from './add-dashboard-dialog/add-dashboard-dialog.component'
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RegisterComponent } from './register/register.component'
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { AddGraphComponent } from './add-graph/add-graph.component';
import {MatStepperModule} from '@angular/material/stepper'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginNotificationComponent } from './login-notification/login-notification.component';
import { EmptyListComponent } from './empty-list/empty-list.component'

@NgModule({
  declarations: [
    AppComponent,
    PiechartComponent,
    LinechartComponent,
    DashboardsComponent,
    DashboardDetailComponent,
    ChartComponent,
    AddDashboardDialogComponent,
    RegisterComponent,
    LoginComponent,
    AddGraphComponent,
    LoginNotificationComponent,
    EmptyListComponent
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
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
