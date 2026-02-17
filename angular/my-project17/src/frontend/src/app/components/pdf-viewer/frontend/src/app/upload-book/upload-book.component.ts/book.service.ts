import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BooksResponse } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}

  getBooks(params?: any): Observable<BooksResponse> {
    let p = new HttpParams();
    if (params?.page) p = p.set('page', params.page);
    if (params?.limit) p = p.set('limit', params.limit);
    if (params?.search) p = p.set('search', params.search);
    if (params?.category) p = p.set('category', params.category);
    return this.http.get<BooksResponse>(`${this.api}/books`, { params: p });
  }

  getBook(id: string) { return this.http.get<any>(`${this.api}/books/${id}`); }
  uploadBook(fd: FormData) { return this.http.post(`${this.api}/books`, fd); }
  updateBook(id: string, fd: FormData) { return this.http.put(`${this.api}/books/${id}`, fd); }
  deleteBook(id: string) { return this.http.delete(`${this.api}/books/${id}`); }
  downloadBook(id: string) { return this.http.get(`${this.api}/books/${id}/download`); }
  getCategories() { return this.http.get<any>(`${this.api}/books/categories`); }
  coverUrl(f: string) { return `http://localhost:5000/uploads/covers/${f}`; }
  pdfUrl(f: string) { return `http://localhost:5000/uploads/pdfs/${f}`; }
}