import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Forecast } from '../city';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  public forecast$: Observable<Forecast>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.forecast$ = this.route.data.pipe(
      map((data: Data) => data.weatherForecast),
      tap((forecast: Forecast) => console.log(forecast))
    );
  }
}
