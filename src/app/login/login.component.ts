import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = null;
    this.authService.login({ username : this.username, password: this.password }).subscribe(({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Login failed';
      }
    }));
  }
}
