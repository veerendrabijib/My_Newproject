import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  template: `
    <app-navbar />
    <div class="min-h-screen bg-gray-950 text-white">
      @if (book) {
        <div class="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <a [routerLink]="['/books', book._id]" class="text-blue-400 hover:underline text-sm">← Back</a>
            <span class="text-gray-500">|</span>
            <span class="text-white font-medium text-sm">{{ book.title }}</span>
          </div>
          <button (click)="download()" class="bg-green-700 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm transition">⬇ Download</button>
        </div>
        <iframe [src]="safePdfUrl" class="w-full" style="height:calc(100vh - 112px)" type="application/pdf">
          <p class="text-center py-10 text-gray-400">
            Can't preview PDF. <a [href]="safePdfUrl" target="_blank" class="text-blue-400">Open directly</a>
          </p>
        </iframe>
      }
    </div>
  `
})
export class PdfViewerComponent implements OnInit {
  route = inject(ActivatedRoute); bookService = inject(BookService); sanitizer = inject(DomSanitizer);
  book: Book | null = null; safePdfUrl!: SafeResourceUrl;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).subscribe(res => {
      this.book = res.data;
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bookService.pdfUrl(this.book!.pdfFile));
    });
  }

  download() {
    if (!this.book) return;
    this.bookService.downloadBook(this.book._id).subscribe((res: any) => {
      window.open(`http://localhost:5000${res.downloadUrl}`, '_blank');
    });
  }
}