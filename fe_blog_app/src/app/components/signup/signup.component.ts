import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = {
    username: '',
    email: '',
    password: ''
  };
  
  confirmPassword = '';
  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (!this.user.username || !this.user.email || !this.user.password) {
      this.error = 'All fields are required';
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.user.password.length < 6) {
      this.error = 'Password must be at least 6 characters long';
      return;
    }

    this.loading = true;

    this.authService.signup(this.user).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Account created successfully! You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.error = error.error?.error || 'Registration failed';
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}