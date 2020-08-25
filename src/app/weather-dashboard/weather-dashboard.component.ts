import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { forkJoin, Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
interface CityKeyMap {
  city: string;
  cityId: string;
}
@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss']
})
export class WeatherDashboardComponent implements OnInit {
  public cities$: Observable<City[]>;

  private cityMap: CityKeyMap[] = [
    { city: 'netherlands', cityId: '2759794' },
    { city: 'germany', cityId: '2921044' },
    { city: 'belgium', cityId: '2802361' },
    { city: 'britain', cityId: '2643741' }
  ];

  constructor(public weatherService: WeatherService, public router: Router) {}

  ngOnInit(): void {
    this.getWeather();
  }

  loadWeatherForecast(city: City) {
    this.router.navigate(['/weather-forecast', city.id]);
  }

  getWeather() {
    this.cities$ = forkJoin(
      this.cityMap
        .map(({ cityId }: CityKeyMap) => cityId)
        .map(cityId => this.weatherService.getCurrentWeather(cityId))
    );
  }
}
