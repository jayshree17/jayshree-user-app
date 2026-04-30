import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  User,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  /** Observable of the current logged-in user */
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // If a token exists on app start, fetch the user profile
    if (this.getToken()) {
      this.loadUserProfile();
    }
  }

  /** Register a new user */
  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>('/api/auth/register', data);
  }

  /** Login and store the JWT token */
  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('/api/auth/login', data).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        this.loadUserProfile();
      })
    );
  }

  /** Fetch the current user's profile */
  loadUserProfile(): void {
    this.http.get<User>('/api/users/me').subscribe({
      next: (user) => this.currentUserSubject.next(user),
      error: () => {
        // Token invalid or expired — clear it
        this.logout();
      },
    });
  }

  /** Logout: clear token, reset user, navigate to login */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /** Get the stored JWT token */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Check if user is authenticated */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
