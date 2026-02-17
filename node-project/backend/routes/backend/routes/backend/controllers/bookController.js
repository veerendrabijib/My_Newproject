const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    let query = {};
    if (req.query.search) query.$text = { $search: req.query.search };
    if (req.query.category) query.category = req.query.category;
    if (req.query.author) query.author = new RegExp(req.query.author, 'i');

    const total = await Book.countDocuments(query);
    const books = await Book.find(query).populate('uploadedBy', 'name').sort({ createdAt: -1 }).skip(skip).limit(limit);

    res.json({ success: true, data: books, pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalBooks: total, hasNext: page < Math.ceil(total / limit), hasPrev: page > 1 } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('uploadedBy', 'name email');
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    book.views += 1;
    await book.save();
    res.json({ success: true, data: book });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const uploadBook = async (req, res) => {
  try {
    if (!req.files?.pdfFile) return res.status(400).json({ success: false, message: 'PDF required' });
    const { title, author, category, description } = req.body;
    const bookData = { title, author, category, description, pdfFile: req.files.pdfFile[0].filename, uploadedBy: req.user._id };
    if (req.files.coverImage) bookData.coverImage = req.files.coverImage[0].filename;
    const book = await Book.create(bookData);
    res.status(201).json({ success: true, message: 'Book uploaded!', data: book });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    const { title, author, category, description } = req.body;
    const update = { title, author, category, description };
    if (req.files?.coverImage) {
      if (book.coverImage !== 'default-cover.jpg') fs.unlink(`uploads/covers/${book.coverImage}`, () => {});
      update.coverImage = req.files.coverImage[0].filename;
    }
    if (req.files?.pdfFile) {
      fs.unlink(`uploads/pdfs/${book.pdfFile}`, () => {});
      update.pdfFile = req.files.pdfFile[0].filename;
    }
    book = await Book.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    res.json({ success: true, message: 'Book updated', data: book });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    fs.unlink(path.join('uploads/pdfs', book.pdfFile), () => {});
    if (book.coverImage !== 'default-cover.jpg') fs.unlink(path.join('uploads/covers', book.coverImage), () => {});
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Book deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const downloadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    book.downloads += 1;
    await book.save();
    res.json({ success: true, downloadUrl: `/uploads/pdfs/${book.pdfFile}` });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const getCategories = (req, res) => {
  res.json({ success: true, data: ['Fiction', 'Science', 'Mathematics', 'Govt Exam', 'History', 'Biography', 'Self-Help', 'Technology', 'Other'] });
};

module.exports = { getBooks, getBook, uploadBook, updateBook, deleteBook, downloadBook, getCategories };