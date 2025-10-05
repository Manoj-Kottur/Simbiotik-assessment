import { TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { of } from 'rxjs';

class MockWeatherService {
  getCityTemperature() { return of({ name: 'Bengaluru', main: { temp: 25 } }); }
  getTemperatureForecast() { return of(20); }
}

describe('WeatherComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: WeatherService, useClass: MockWeatherService }],
      imports: [WeatherComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WeatherComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should call getCityTemperature when requested', () => {
    const fixture = TestBed.createComponent(WeatherComponent);
    fixture.detectChanges();
  const svc = TestBed.inject(WeatherService) as unknown as MockWeatherService;
  const spy = jest.spyOn(svc, 'getCityTemperature');
    const comp = fixture.componentInstance;
    comp.getCityTemperature();
    expect(spy).toHaveBeenCalled();
  });
});
