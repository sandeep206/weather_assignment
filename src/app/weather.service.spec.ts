import { HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';

import { WeatherService } from './weather.service';
import { City, Forecast, Hourly } from './city';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(error: any) {
  return defer(() => Promise.reject(error));
}

describe('WeatherService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let weatherService: WeatherService;
  const mockCity: City = {
    id: '111',
    name: 'Netherlands',
    weather: [
      {
        id: '',
        main: '',
        description: '',
        icon: ``
      }
    ],
    timezone: null,
    main: null,
    wind: null,
    dt: '',
    base: null,
    clouds: null,
    visibility: ''
  };

  const hourly: Hourly[] = [
    {
      dt_txt: '3pm',
      weather: null,
      main: null,
      wind: null,
      clouds: null
    }
  ];

  const mockForecast: Forecast = {
    list: hourly,
    city: mockCity
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    weatherService = new WeatherService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(weatherService).toBeTruthy();
  });

  it('should get the weather report for the city id', () => {
    httpClientSpy.get.and.returnValue(asyncData(mockCity));

    weatherService.getCurrentWeather('111').subscribe(response => {
      mockCity.weather[0].icon = 'https://openweathermap.org/img/wn/@2x.png';
      expect(response).toEqual(mockCity, 'expected weather response');
    });
  });

  it('should get the weather forecast for the city id', () => {
    httpClientSpy.get.and.returnValue(asyncData(mockForecast));

    weatherService.getWeatherForecast('111').subscribe(response => {
      mockForecast.list[0].weather[0].icon = 'https://openweathermap.org/img/wn/@2x.png';
      expect(response).toEqual(mockForecast, 'expected forecast response');
    });
  });

  it('should return error when server is not reachable', () => {
    const response = new HttpErrorResponse({
      error: 'not found',
      status: 404,
      statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(response));

    weatherService.getCurrentWeather('1111').subscribe(() => {}, error => expect(error.status).toEqual(404));

    weatherService.getWeatherForecast('1111').subscribe(() => {}, error => expect(error.status).toEqual(404));
  });
});
