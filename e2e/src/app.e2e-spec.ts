import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Weather Report');
  });

  it('should display weather cards on the page', async () => {
    await page.navigateTo();
    expect(await page.getWeatherCard().count()).toBe(5);
  });

  it('should be able to click a card and navigate to forecast page',  async () => {
    await page.navigateTo();
    await page.getFirstWeatherCardElement().click();
    expect(await page.getForecastTitleText()).toEqual('City of London');
    expect(await page.getForecastCards().count()).toBeGreaterThan(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
