import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar />
    <div class="min-h-screen bg-gray-950 text-white py-8 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold">⚙️ Admin Dashboard</h1>
          <a routerLink="/admin/upload"
            class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition">+ Upload Book</a>
        </div>
        <div class="grid grid-cols-4 gap-4 mb-8">
          @for (stat of stats; track stat.label) {
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div class="text-2xl font-bold text-blue-400">{{ stat.val }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ stat.label }}</div>
            </div>
          }
        </div>
        <div class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-800 font-semibold text-gray-300">All Books</div>
          <table class="w-full text-sm">
            <thead class="bg-gray-950 text-gray-500 text-xs uppercase">
              <tr>
                <th class="text-left py-3 px-4">Cover</th>
                <th class="text-left py-3 px-4">Title</th>
                <th class="text-left py-3 px-4">Author</th>
                <th class="text-left py-3 px-4">Category</th>
                <th class="text-left py-3 px-4">Stats</th>
                <th class="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (book of books; track book._id) {
                <tr class="border-t border-gray-800 hover:bg-gray-800 transition">
                  <td class="py-3 px-4">
                    <img [src]="bookService.coverUrl(book.coverImage)" class="w-8 h-12 object-cover rounded" onerror="this.style.display='none'"/>
                  </td>
                  <td class="py-3 px-4 font-medium text-white">{{ book.title }}</td>
                  <td class="py-3 px-4 text-gray-400">{{ book.author }}</td>
                  <td class="py-3 px-4">
                    <span class="bg-blue-950 text-blue-300 text-xs px-2 py-0.5 rounded-full">{{ book.category }}</span>
                  </td>
                  <td class="py-3 px-4 text-gray-500 text-xs">👁 {{ book.views }} | ⬇ {{ book.downloads }}</td>
                  <td class="py-3 px-4">
                    <div class="flex gap-2">
                      <a [routerLink]="['/admin/edit', book._id]"
                        class="bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs transition">Edit</a>
                      <button (click)="delete(book._id)"
                        class="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition">Delete</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          @if (books.length === 0 && !loading) {
            <div class="text-center py-12 text-gray-600">
              No books yet. <a routerLink="/admin/upload" class="text-blue-400 hover:underline">Upload one!</a>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  bookService = inject(BookService); books: Book[] = []; loading = true;
  stats = [{ val: '0', label: 'Total Books' }, { val: '0', label: 'Total Views' }, { val: '0', label: 'Downloads' }, { val: '8', label: 'Categories' }];

  ngOnInit() {
    this.bookService.getBooks({ limit: 100 }).subscribe({ next: res => { this.books = res.data; this.stats[0].val = String(res.pagination.totalBooks); this.loading = false; } });
  }

  delete(id: string) {
    if (!confirm('Delete this book?')) return;
    this.bookService.deleteBook(id).subscribe(() => { this.books = this.books.filter(b => b._id !== id); });
  }
}
