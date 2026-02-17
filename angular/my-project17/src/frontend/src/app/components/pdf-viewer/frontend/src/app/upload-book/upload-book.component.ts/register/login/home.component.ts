import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar />
    <div class="min-h-screen bg-gray-950 text-white">
      <!-- Hero -->
      <div class="bg-gradient-to-br from-blue-950 via-gray-900 to-gray-950 py-16 px-6 text-center border-b border-gray-800">
        <div class="text-6xl mb-4">📚</div>
        <h1 class="text-4xl font-extrabold mb-3">Welcome to <span class="text-blue-400">EduLibrary</span></h1>
        <p class="text-gray-400 text-lg mb-8">Fiction · Science · Mathematics · Govt Exam Books & More</p>
        <div class="flex gap-3 max-w-lg mx-auto">
          <input [(ngModel)]="search" (keyup.enter)="doSearch()" placeholder="Search books, authors..."
            class="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"/>
          <button (click)="doSearch()" class="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold text-sm transition">Search</button>
        </div>
        <div class="flex justify-center gap-10 mt-10">
          @for (stat of stats; track stat.label) {
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-400">{{ stat.val }}</div>
              <div class="text-xs text-gray-500">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>

      <!-- Categories -->
      <div class="max-w-7xl mx-auto px-6 py-10">
        <h2 class="text-2xl font-bold mb-6">📂 Browse by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          @for (cat of categories; track cat.id) {
            <div (click)="filterCat(cat.id)"
              class="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center cursor-pointer hover:-translate-y-1 hover:border-blue-600 transition-all duration-200">
              <div class="text-4xl mb-2">{{ cat.icon }}</div>
              <div class="font-semibold text-sm text-gray-200">{{ cat.label }}</div>
            </div>
          }
        </div>

        <!-- Featured Books -->
        <h2 class="text-2xl font-bold mb-6">⭐ Featured Books</h2>
        @if (loading) {
          <div class="flex justify-center py-16">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        } @else {
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            @for (book of books; track book._id) {
              <a [routerLink]="['/books', book._id]"
                class="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 group">
                <div class="h-36 bg-gradient-to-br from-blue-950 to-gray-900 flex items-center justify-center overflow-hidden">
                  <img [src]="bookService.coverUrl(book.coverImage)" [alt]="book.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onerror="this.style.display='none'"/>
                </div>
                <div class="p-3">
                  <div class="text-xs font-semibold text-white truncate">{{ book.title }}</div>
                  <div class="text-xs text-gray-500 truncate mt-0.5">{{ book.author }}</div>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full">{{ book.category }}</span>
                    <span class="text-yellow-400 text-xs">★ {{ book.rating }}</span>
                  </div>
                </div>
              </a>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  bookService = inject(BookService);
  books: Book[] = [];
  loading = false;
  search = '';
  selectedCat = '';

  stats = [
    { val: '500+', label: 'Books' }, { val: '8', label: 'Categories' },
    { val: '50K+', label: 'Readers' }, { val: 'Free', label: 'Access' }
  ];

  categories = [
    { id: 'Fiction', label: 'Fiction & Literature', icon: '📖' },
    { id: 'Science', label: 'Science & Tech', icon: '🔬' },
    { id: 'Mathematics', label: 'Mathematics', icon: '📐' },
    { id: 'Govt Exam', label: 'Govt. Exam Prep', icon: '🏛️' },
    { id: 'History', label: 'History', icon: '🏺' },
    { id: 'Biography', label: 'Biography', icon: '👤' },
    { id: 'Self-Help', label: 'Self-Help', icon: '💡' },
    { id: 'Technology', label: 'Technology', icon: '💻' },
  ];

  ngOnInit() { this.loadBooks(); }

  loadBooks() {
    this.loading = true;
    this.bookService.getBooks({ search: this.search, category: this.selectedCat }).subscribe({
      next: res => { this.books = res.data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  doSearch() { this.loadBooks(); }
  filterCat(cat: string) { this.selectedCat = cat; this.loadBooks(); }
}