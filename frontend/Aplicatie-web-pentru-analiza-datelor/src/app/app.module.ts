import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { NgxEchartsModule } from 'ngx-echarts';
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> 6e7ec94f8e23559276f486e9b5ea216fd1db2bea
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { PiechartComponent } from './piechart/piechart/piechart.component';


@NgModule({
  declarations: [
    AppComponent,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
=======
    HttpClientModule,
>>>>>>> 6e7ec94f8e23559276f486e9b5ea216fd1db2bea
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
