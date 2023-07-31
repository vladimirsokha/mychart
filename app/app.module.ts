import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineHighChartComponent } from './line-highchart/line-highchart.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ChartsModule, ChartModule],
  declarations: [ AppComponent, LineChartComponent, LineHighChartComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
