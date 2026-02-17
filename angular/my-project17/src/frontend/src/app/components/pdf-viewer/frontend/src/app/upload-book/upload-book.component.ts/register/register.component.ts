import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="text-5xl mb-3">📚</div>
          <h1 class="text-2xl font-bold text-white">Join <span class="text-blue-400">EduLibrary</span></h1>
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          @if (error) {
            <div class="bg-red-950 border border-red-800 text-red-400 rounded-xl p-3 mb-4 text-sm">{{ error }}</div>
          }
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block text-gray-400 text-sm mb-1">Full Name</label>
              <input formControlName="name" type="text" placeholder="John Doe"
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"/>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1">Email</label>
              <input formControlName="email" type="email" placeholder="you@example.com"
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"/>
            </div>
            <div>
              <label class="block text-gray-400 text-sm mb-1">Password</label>
              <input formControlName="password" type="password" placeholder="Min 6 characters"
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"/>
            </div>
            <button type="submit" [disabled]="loading"
              class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition text-sm">
              {{ loading ? 'Creating account...' : '🚀 Create Account' }}
            </button>
          </form>
          <p class="text-gray-500 text-sm text-center mt-6">
            Already registered? <a routerLink="/login" class="text-blue-400 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  fb = inject(FormBuilder); auth = inject(AuthService); router = inject(Router);
  loading = false; error = '';
  form = this.fb.group({ name: ['', [Validators.required, Validators.minLength(2)]], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true; this.error = '';
    this.auth.register(this.form.value).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: (err: any) => { this.loading = false; this.error = err.error?.message || 'Registration failed.'; }
    });
  }
}
