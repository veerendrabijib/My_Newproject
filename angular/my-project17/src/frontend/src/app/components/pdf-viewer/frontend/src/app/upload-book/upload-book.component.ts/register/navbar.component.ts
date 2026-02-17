import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 px-6 h-16 flex items-center justify-between">
      <a routerLink="/" class="flex items-center gap-2 text-blue-400 font-bold text-xl">
        📚 <span>EduLibrary</span>
        <span class="bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full">BETA</span>
      </a>
      <div class="flex items-center gap-2">
        <a routerLink="/" class="text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition">🏠 Home</a>
        <a routerLink="/books/categories" class="text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-sm transition">📂 Categories</a>
        @if (auth.isAdmin()) {
          <a routerLink="/admin" class="text-yellow-400 hover:text-yellow-300 px-3 py-1.5 rounded-lg text-sm transition">⚙️ Admin</a>
        }
        @if (auth.isLoggedIn()) {
          <span class="text-gray-500 text-sm">Hi, {{ auth.currentUser()?.name }}</span>
          <button (click)="auth.logout()" class="bg-red-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition">Logout</button>
        } @else {
          <a routerLink="/login" class="text-gray-400 hover:text-white px-3 py-1.5 text-sm transition">Login</a>
          <a routerLink="/register" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm transition">Register</a>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent { auth = inject(AuthService); }