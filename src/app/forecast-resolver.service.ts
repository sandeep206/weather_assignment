import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Forecast } from './city';
import { Observable, of } from 'rxjs';
import { WeatherService } from './weather.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastResolverService implements Resolve<Forecast> {
  constructor(public weatherService: WeatherService, public router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Forecast> | Promise<Forecast> | Forecast {
    const cityId = route.paramMap.get('city-id');
    return this.weatherService.getWeatherForecast(cityId).pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
