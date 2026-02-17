export interface Book {
  _id: string; title: string; author: string; category: string;
  description: string; coverImage: string; pdfFile: string;
  uploadedBy: { name: string; email: string };
  downloads: number; views: number; rating: number; createdAt: string;
}
export interface BooksResponse {
  success: boolean; data: Book[];
  pagination: { currentPage: number; totalPages: number; totalBooks: number; hasNext: boolean; hasPrev: boolean; };
}