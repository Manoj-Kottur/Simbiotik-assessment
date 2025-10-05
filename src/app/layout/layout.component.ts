import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [RouterModule, SidebarComponent]
})
export class LayoutComponent {}
