import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class WeatherComponent implements OnInit {
  city = 'Bengaluru';
  current: any = null;
  forecast: any[] = [];
  loading = false;
  error = false;
  avgTemp: number | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.city = 'Bengaluru';
    this.getCityTemperature();
  }

  retry() {
    this.getCityTemperature();
  }

  getCityTemperature() {
    this.loading = true;
    this.weatherService.getCityTemperature(this.city).subscribe({
      next:(data) => {
        this.current = data;
        this.getAvgTemp();
      },
      error: (err) => { 
        this.error = true;
        this.loading = false;
      },
      complete: () => {
        this.error = false;
      }
    });
  }

  getAvgTemp() {
    this.weatherService.getTemperatureForecast(this.city).subscribe({
      next: (data) => {
        this.avgTemp = data;
        this.get5DaysAvg();
      },
      error: (err) => { 
        this.error = true;
        this.loading = false;
      },
      complete: () => { 
        this.error = false;}
    });
  }

  get5DaysAvg() {
    this.weatherService.getTemperatureForecast(this.city, true).subscribe({
      next: (temps) => {
        this.forecast = temps.map((temp: number, index: number) => {
          const date = new Date();
          date.setDate(date.getDate() + index);
          return { date: date.toDateString(), avgTempC: temp };
        });
      },
      error: (err) => { 
        this.error = true; 
        this.loading = false; 
      },
      complete: () => { 
        this.loading = false; 
        this.error = false;
      }
    })
  }

  search() {
    this.getCityTemperature();
  }
}
