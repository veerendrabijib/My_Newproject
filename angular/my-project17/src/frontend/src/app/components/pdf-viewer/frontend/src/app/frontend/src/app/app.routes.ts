import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'books/:id', loadComponent: () => import('./components/book-details/book-details.component').then(m => m.BookDetailsComponent) },
  { path: 'books/:id/read', canActivate: [authGuard], loadComponent: () => import('./components/pdf-viewer/pdf-viewer.component').then(m => m.PdfViewerComponent) },
  { path: 'admin', canActivate: [authGuard, adminGuard], loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'admin/upload', canActivate: [authGuard, adminGuard], loadComponent: () => import('./components/upload-book/upload-book.component').then(m => m.UploadBookComponent) },
  { path: 'admin/edit/:id', canActivate: [authGuard, adminGuard], loadComponent: () => import('./components/upload-book/upload-book.component').then(m => m.UploadBookComponent) },
  { path: '**', redirectTo: '' }
];