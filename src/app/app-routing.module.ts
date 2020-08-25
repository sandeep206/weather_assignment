import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherDashboardComponent } from './weather-dashboard/weather-dashboard.component';
import { ForecastResolverService } from './forecast-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'weather-dashboard', pathMatch: 'full' },
  {
    path: 'weather-dashboard',
    component: WeatherDashboardComponent
  },
  {
    path: 'weather-forecast/:city-id',
    loadChildren: () =>
      import('./weather-forecast/weather-forecast.module').then(
        m => m.WeatherForecastModule
      ),
    resolve: {
      weatherForecast: ForecastResolverService
    }
  },
  {
    path: '**',
    redirectTo: 'weather-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
