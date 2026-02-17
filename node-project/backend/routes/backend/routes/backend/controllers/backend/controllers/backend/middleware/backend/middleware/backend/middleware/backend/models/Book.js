const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  author:      { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Fiction', 'Science', 'Mathematics', 'Govt Exam', 'History', 'Biography', 'Self-Help', 'Technology', 'Other']
  },
  description: { type: String, required: true, maxlength: 1000 },
  coverImage:  { type: String, default: 'default-cover.jpg' },
  pdfFile:     { type: String, required: true },
  uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  downloads:   { type: Number, default: 0 },
  views:       { type: Number, default: 0 },
  rating:      { type: Number, default: 4.5 }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);