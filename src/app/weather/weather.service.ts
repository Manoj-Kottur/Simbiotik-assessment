import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private apiKey = 'ac6c96fb179530179f057d5d36de9b59';

  constructor(private http: HttpClient) {}

  getCityTemperature(city: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get('weather/weather', { params });
  }

  getTemperatureForecast(city: string, getNext5DaysTemp: boolean = false): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    if (!getNext5DaysTemp) {
      // /forecast returns 3-hour interval data for 5 days
      return this.http.get('/weather/forecast', { params }).pipe(
        map((data: any) => {
          const now = new Date();
          const fourDaysLater = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
          const temps: number[] = data.list
            .filter((item: any) => {
              const dt = new Date(item.dt_txt);
              return dt > now && dt < fourDaysLater;
            })
            .map((item: any) => item.main.temp);

          const avg = temps.reduce((sum, t) => sum + t, 0) / temps.length;
          return avg;
        })
      );
    } else {
      return this.http.get('/weather/forecast', { params }).pipe(
        map((data: any) => {
          const tempsByDay: { [key: string]: number[] } = {};
          data.list.forEach((item: any) => {
            const dt = new Date(item.dt_txt);
            const dayKey = dt.toISOString().slice(0, 10);
            if (!tempsByDay[dayKey]) tempsByDay[dayKey] = [];
            tempsByDay[dayKey].push(item.main.temp);
          });

          const days: string[] = [];
          const today = new Date();
          for (let i = 0; i < 5; i++) {
            const d = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
            days.push(d.toISOString().slice(0, 10));
          }
          const avgTemps: any[] = days.map(day =>
            tempsByDay[day]
              ? tempsByDay[day].reduce((sum, t) => sum + t, 0) / tempsByDay[day].length
              : null 
          );
          return avgTemps;
        })
      );
    }
  }
}
