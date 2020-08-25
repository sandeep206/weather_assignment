import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City, Forecast, Hourly, Weather } from './city';
import { map } from 'rxjs/operators';

function constructImgURI(weatherList: Weather[]): Weather[] {
  return weatherList.map(weather => {
    return {
      ...weather,
      icon: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    };
  });
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherURI = 'https://api.openweathermap.org/data/2.5';
  private secretKey = '7ff031f5815df1d6a77bcca7ad8d0fa5';

  constructor(public httpClient: HttpClient) {}

  getCurrentWeather(cityId: string = ''): Observable<City> {
    const forecastNow = 'weather';
    return this.httpClient.get<City>(`${this.weatherURI}/${forecastNow}?id=${cityId}&appid=${this.secretKey}`).pipe(
      map((city: City) => {
        return {
          ...city,
          weather: constructImgURI(city.weather)
        };
      })
    );
  }

  getWeatherForecast(cityId: string): Observable<Forecast> {
    const forecastHourly = 'forecast';
    return this.httpClient
      .get<Forecast>(`${this.weatherURI}/${forecastHourly}?id=${cityId}&appid=${this.secretKey}`)
      .pipe(
        map(forecast => {
          return {
            ...forecast,
            list: forecast.list.map((hourly: Hourly) => {
              return {
                ...hourly,
                weather: constructImgURI(hourly.weather)
              };
            })
          };
        })
      );
  }
}
