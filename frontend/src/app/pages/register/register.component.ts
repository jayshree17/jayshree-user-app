import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-orb bg-orb-3"></div>

      <div class="auth-container">
        <div class="auth-card" id="register-card">
          <!-- Header -->
          <div class="auth-header">
            <div class="auth-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </div>
            <h1 class="auth-title">Create Account</h1>
            <p class="auth-subtitle">Join us today — it takes a moment</p>
          </div>

          <!-- Success message -->
          <div class="alert alert-success" *ngIf="successMessage" id="register-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ successMessage }}
          </div>

          <!-- Error message -->
          <div class="alert alert-error" *ngIf="errorMessage" id="register-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {{ errorMessage }}
          </div>

          <!-- Form -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
            <div class="form-group">
              <label for="full_name" class="form-label">Full Name</label>
              <div class="input-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input type="text" id="full_name" formControlName="full_name" class="form-input" placeholder="Jayshree Wagh" autocomplete="name" />
              </div>
              <span class="form-error" *ngIf="registerForm.get('full_name')?.touched && registerForm.get('full_name')?.invalid">
                Name must be 2–100 characters
              </span>
            </div>

            <div class="form-group">
              <label for="reg-email" class="form-label">Email Address</label>
              <div class="input-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <input type="email" id="reg-email" formControlName="email" class="form-input" placeholder="you@example.com" autocomplete="email" />
              </div>
              <span class="form-error" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid">
                Please enter a valid email
              </span>
            </div>

            <div class="form-group">
              <label for="reg-password" class="form-label">Password</label>
              <div class="input-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input type="password" id="reg-password" formControlName="password" class="form-input" placeholder="Min 6 characters" autocomplete="new-password" />
              </div>
              <span class="form-error" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid">
                Password must be at least 6 characters
              </span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone" class="form-label">Phone <span class="optional">(optional)</span></label>
                <div class="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <input type="tel" id="phone" formControlName="phone" class="form-input" placeholder="+91 77989 65186" autocomplete="tel" />
                </div>
              </div>

              <div class="form-group">
                <label for="city" class="form-label">City <span class="optional">(optional)</span></label>
                <div class="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <input type="text" id="city" formControlName="city" class="form-input" placeholder="Pune" autocomplete="address-level2" />
                </div>
              </div>
            </div>

            <button type="submit" class="btn-submit" id="register-submit-btn" [disabled]="registerForm.invalid || isLoading">
              <span *ngIf="!isLoading">Create Account</span>
              <span *ngIf="isLoading" class="spinner"></span>
            </button>
          </form>

          <!-- Footer -->
          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/login" class="auth-link" id="goto-login">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.registerForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      city: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.detail || 'Registration failed. Please try again.';
      },
    });
  }
}
