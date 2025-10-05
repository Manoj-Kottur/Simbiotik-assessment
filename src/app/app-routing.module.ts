import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/services/auth.guard';
import { TodoFormComponent } from './todo/todo-form.component';
import { WeatherComponent } from './weather/weather.component';
import { MapComponent } from './map/map.component';
import { TodoListComponent } from './todo/todo-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'todo', pathMatch: 'full' },
      { path: 'todo', component: TodoListComponent },
      { path: 'weather', component: WeatherComponent },
      { path: 'map', component: MapComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
