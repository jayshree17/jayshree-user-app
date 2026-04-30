import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" id="main-navbar">
      <div class="nav-inner">
        <a class="nav-logo" routerLink="/">
          <span class="logo-icon">JW</span>
          <span class="logo-text">UserApp</span>
        </a>
        <div class="nav-actions" *ngIf="authService.isAuthenticated()">
          <span class="nav-user" *ngIf="authService.currentUser$ | async as user">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ user.full_name }}
          </span>
          <button class="btn-logout" id="logout-btn" (click)="authService.logout()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(10, 10, 26, 0.85);
      border-bottom: 1px solid rgba(99, 102, 241, 0.15);
      padding: 0 2rem;
      height: 70px;
    }

    .nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      transition: transform 0.3s;
    }

    .nav-logo:hover {
      transform: scale(1.03);
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #6366f1, #a78bfa);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.85rem;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }

    .logo-text {
      font-weight: 700;
      font-size: 1.15rem;
      background: linear-gradient(135deg, #fff, #c7d2fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-user {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .nav-user svg {
      color: #a78bfa;
    }

    .btn-logout {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1.2rem;
      border: 1px solid rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.08);
      color: #f87171;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'Inter', sans-serif;
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.5);
      transform: translateY(-1px);
    }

    @media (max-width: 600px) {
      .nav-user span {
        display: none;
      }
      .navbar {
        padding: 0 1rem;
      }
    }
  `],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
