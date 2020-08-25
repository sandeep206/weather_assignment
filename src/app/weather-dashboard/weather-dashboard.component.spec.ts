import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { WeatherDashboardComponent } from './weather-dashboard.component';
import { WeatherService } from '../weather.service';
import { City } from '../city';
import { Router } from '@angular/router';

const weatherData: City = {
  coord: {
    lon: '145.77',
    lat: '-16.92'
  },
  weather: [
    {
      id: '804',
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04n'
    }
  ],
  base: 'stations',
  main: {
    temp: '292.08',
    pressure: '1016',
    humidity: 77,
    temp_min: '292.04',
    temp_max: '292.15'
  },
  visibility: '10000',
  wind: {
    speed: '1.02',
    deg: '165.079'
  },
  clouds: {
    all: '90'
  },
  dt: '1565447764',
  timezone: '36000',
  id: '2172797',
  name: 'Cairns'
};

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let weatherService: WeatherService;
  let weatherElement: DebugElement;

  const weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const response = [weatherData, weatherData, weatherData, weatherData, weatherData];
  const getWeatherSpy = weatherServiceMock.getCurrentWeather.and.returnValue(of(response));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherDashboardComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceMock }, { provide: Router, useValue: routerMock }]
    });

    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    weatherElement = fixture.nativeElement.querySelector('.weather');
    weatherService = TestBed.get(WeatherService);
  }));

  it('should call the weather service 5 times', () => {
    component.ngOnInit();
    component.cities$.subscribe(() => {
      expect(getWeatherSpy).toHaveBeenCalled();
      expect(getWeatherSpy.get.calls.count()).toBe(5);
    });
  });

  it('should navigate to weather forecast page', () => {
    component.loadWeatherForecast(weatherData);
    const navigateSpy = routerMock.navigate.and.returnValue(Promise.resolve());

    expect(navigateSpy).toHaveBeenCalledWith(['/weather-forecast', weatherData.id]);
  });
});
