import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getWeatherCard() {
    return element.all(by.css('.weather'));
  }

  getForecastTitleText() {
    return element(by.css('app-weather-forecast h1')).getText() as Promise<string>;
  }

  getForecastCards() {
    return element.all(by.css('app-weather-forecast .container'));
  }

  getFirstWeatherCardElement() {
    return element(by.css('.weather'));
  }
}
