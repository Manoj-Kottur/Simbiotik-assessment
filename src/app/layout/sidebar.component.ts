import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterModule]
})

export class SidebarComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
