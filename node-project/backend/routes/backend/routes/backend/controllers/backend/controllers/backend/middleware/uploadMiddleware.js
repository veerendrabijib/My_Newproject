const multer = require('multer');
const path = require('path');
const fs = require('fs');

['uploads/covers', 'uploads/pdfs'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, file.fieldname === 'coverImage' ? 'uploads/covers/' : 'uploads/pdfs/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage' && file.mimetype.startsWith('image/')) cb(null, true);
  else if (file.fieldname === 'pdfFile' && file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 50 * 1024 * 1024 } });