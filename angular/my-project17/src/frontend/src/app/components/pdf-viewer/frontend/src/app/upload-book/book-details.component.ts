import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar />
    <div class="min-h-screen bg-gray-950 text-white py-10 px-6">
      @if (loading) {
        <div class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      }
      @if (book) {
        <div class="max-w-4xl mx-auto">
          <a routerLink="/" class="text-blue-400 hover:underline text-sm mb-6 block">← Back to Library</a>
          <div class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div class="md:w-56 flex-shrink-0 bg-gradient-to-br from-blue-950 to-gray-900 flex items-center justify-center p-6">
              <img [src]="bookService.coverUrl(book.coverImage)" [alt]="book.title"
                class="w-full h-64 object-cover rounded-xl" onerror="this.style.display='none'"/>
            </div>
            <div class="p-8 flex flex-col justify-between flex-1">
              <div>
                <span class="bg-blue-950 text-blue-300 px-3 py-1 rounded-full text-xs">{{ book.category }}</span>
                <h1 class="text-3xl font-bold mt-3 mb-1">{{ book.title }}</h1>
                <p class="text-gray-400 mb-4">by {{ book.author }}</p>
                <p class="text-gray-300 leading-relaxed text-sm">{{ book.description }}</p>
                <div class="flex gap-6 mt-6 text-sm text-gray-500">
                  <span>👁 {{ book.views }} views</span>
                  <span>⬇ {{ book.downloads }} downloads</span>
                  <span>★ {{ book.rating }}</span>
                  <span>📅 {{ book.createdAt | date:'mediumDate' }}</span>
                </div>
              </div>
              <div class="flex gap-3 mt-8 flex-wrap">
                @if (auth.isLoggedIn()) {
                  <a [routerLink]="['/books', book._id, 'read']"
                    class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition text-sm">📖 Read Online</a>
                  <button (click)="download()"
                    class="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition text-sm">⬇ Download PDF</button>
                } @else {
                  <a routerLink="/login"
                    class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition text-sm">🔐 Login to Read / Download</a>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class BookDetailsComponent implements OnInit {
  route = inject(ActivatedRoute); bookService = inject(BookService); auth = inject(AuthService);
  book: Book | null = null; loading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).subscribe({ next: res => { this.book = res.data; this.loading = false; }, error: () => { this.loading = false; } });
  }

  download() {
    if (!this.book) return;
    this.bookService.downloadBook(this.book._id).subscribe((res: any) => {
      const link = document.createElement('a');
      link.href = `http://localhost:5000${res.downloadUrl}`;
      link.download = this.book!.title + '.pdf';
      link.click();
    });
  }
}
