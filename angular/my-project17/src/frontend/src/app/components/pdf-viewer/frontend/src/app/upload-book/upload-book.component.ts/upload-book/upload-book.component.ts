import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-upload-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  template: `
    <app-navbar />
    <div class="min-h-screen bg-gray-950 text-white py-10 px-6">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-8">{{ isEdit ? '✏️ Edit Book' : '📤 Upload New Book' }}</h1>
        @if (success) {
          <div class="bg-green-950 border border-green-800 text-green-400 rounded-xl p-3 mb-4 text-sm">
            ✅ Book {{ isEdit ? 'updated' : 'uploaded' }} successfully! Redirecting...
          </div>
        }
        <form [formGroup]="form" (ngSubmit)="onSubmit()"
          class="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5">
          <div>
            <label class="block text-gray-400 text-sm mb-1">Title *</label>
            <input formControlName="title" type="text" placeholder="Book title"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"/>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">Author *</label>
            <input formControlName="author" type="text" placeholder="Author name"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"/>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">Category *</label>
            <select formControlName="category"
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500">
              <option value="">Select category</option>
              @for (cat of categories; track cat) {
                <option [value]="cat">{{ cat }}</option>
              }
            </select>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">Description *</label>
            <textarea formControlName="description" rows="4" placeholder="Book description..."
              class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">Cover Image {{ isEdit ? '(optional)' : '' }}</label>
            <input type="file" accept="image/*" (change)="onCover($event)"
              class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-950 file:text-blue-300 hover:file:bg-blue-900"/>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-1">PDF File {{ isEdit ? '(optional)' : '*' }}</label>
            <input type="file" accept=".pdf" (change)="onPdf($event)"
              class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-green-950 file:text-green-300 hover:file:bg-green-900"/>
          </div>
          <button type="submit" [disabled]="loading || form.invalid"
            class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white py-3 rounded-xl font-semibold transition text-sm">
            {{ loading ? 'Saving...' : (isEdit ? '✏️ Update Book' : '📤 Upload Book') }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class UploadBookComponent implements OnInit {
  fb = inject(FormBuilder); bookService = inject(BookService); router = inject(Router); route = inject(ActivatedRoute);
  isEdit = false; bookId = ''; loading = false; success = false;
  coverFile: File | null = null; pdfFile: File | null = null;
  categories = ['Fiction', 'Science', 'Mathematics', 'Govt Exam', 'History', 'Biography', 'Self-Help', 'Technology', 'Other'];
  form = this.fb.group({ title: ['', Validators.required], author: ['', Validators.required], category: ['', Validators.required], description: ['', Validators.required] });

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.isEdit = !!this.bookId;
    if (this.isEdit) {
      this.bookService.getBook(this.bookId).subscribe(res => {
        const b = res.data;
        this.form.patchValue({ title: b.title, author: b.author, category: b.category, description: b.description });
      });
    }
  }

  onCover(e: any) { this.coverFile = e.target.files[0]; }
  onPdf(e: any) { this.pdfFile = e.target.files[0]; }

  onSubmit() {
    if (this.form.invalid) return;
    if (!this.isEdit && !this.pdfFile) { alert('PDF file is required!'); return; }
    this.loading = true;
    const fd = new FormData();
    Object.entries(this.form.value).forEach(([k, v]) => fd.append(k, v as string));
    if (this.coverFile) fd.append('coverImage', this.coverFile);
    if (this.pdfFile) fd.append('pdfFile', this.pdfFile);
    const req$ = this.isEdit ? this.bookService.updateBook(this.bookId, fd) : this.bookService.uploadBook(fd);
    req$.subscribe({
      next: () => { this.loading = false; this.success = true; setTimeout(() => this.router.navigate(['/admin']), 1500); },
      error: () => { this.loading = false; }
    });
  }
}