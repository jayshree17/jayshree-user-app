import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="dashboard-page">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>

      <div class="dashboard-container" *ngIf="user">
        <!-- Welcome banner -->
        <div class="welcome-banner" id="welcome-banner">
          <div class="welcome-text">
            <span class="welcome-label">Dashboard</span>
            <h1 class="welcome-title">Welcome back, {{ user.full_name.split(' ')[0] }}!</h1>
            <p class="welcome-subtitle">Here's your profile information</p>
          </div>
          <div class="welcome-avatar">
            <span class="avatar-initials">{{ getInitials(user.full_name) }}</span>
          </div>
        </div>

        <!-- Profile card -->
        <div class="profile-section">
          <div class="section-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile Details
          </div>

          <div class="profile-card glass-card" id="profile-card">
            <div class="profile-grid">
              <div class="profile-field">
                <span class="field-label">Full Name</span>
                <span class="field-value">{{ user.full_name }}</span>
              </div>
              <div class="profile-field">
                <span class="field-label">Email Address</span>
                <span class="field-value">{{ user.email }}</span>
              </div>
              <div class="profile-field">
                <span class="field-label">Phone</span>
                <span class="field-value">{{ user.phone || '—' }}</span>
              </div>
              <div class="profile-field">
                <span class="field-label">City</span>
                <span class="field-value">{{ user.city || '—' }}</span>
              </div>
              <div class="profile-field">
                <span class="field-label">Member Since</span>
                <span class="field-value">{{ user.created_at | date:'mediumDate' }}</span>
              </div>
              <div class="profile-field">
                <span class="field-label">Last Updated</span>
                <span class="field-value">{{ user.updated_at | date:'medium' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats cards -->
        <div class="stats-grid">
          <div class="stat-card glass-card">
            <div class="stat-icon stat-icon-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Account Status</span>
              <span class="stat-value stat-active">Active</span>
            </div>
          </div>

          <div class="stat-card glass-card">
            <div class="stat-icon stat-icon-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">User ID</span>
              <span class="stat-value">#{{ user.id }}</span>
            </div>
          </div>

          <div class="stat-card glass-card">
            <div class="stat-icon stat-icon-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Joined</span>
              <span class="stat-value">{{ user.created_at | date:'shortDate' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div class="loading" *ngIf="!user">
        <div class="spinner-lg"></div>
        <p>Loading your profile...</p>
      </div>
    </div>
  `,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
