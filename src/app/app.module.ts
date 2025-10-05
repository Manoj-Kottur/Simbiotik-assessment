import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// Components are now standalone and are bootstrapped via `bootstrapApplication`.
// Keep AppModule focused on providers only.
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
// standalone components removed from module imports
import { TodoService } from './todo/services/todo.service';
import { MapService } from './map/services/map.service';
import { WeatherService } from './weather/weather.service';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [AuthService, AuthGuard,
    TodoService,
    MapService,
    WeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AppModule { }
