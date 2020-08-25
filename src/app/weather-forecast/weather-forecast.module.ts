import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from './weather-forecast.component';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    component: WeatherForecastComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [WeatherForecastComponent],
  declarations: [WeatherForecastComponent],
  providers: []
})
export class WeatherForecastModule {}
