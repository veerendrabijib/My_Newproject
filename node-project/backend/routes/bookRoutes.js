const express = require('express');
const router = express.Router();
const { getBooks, getBook, uploadBook, updateBook, deleteBook, downloadBook, getCategories } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getBooks);
router.get('/categories', getCategories);
router.get('/:id', getBook);
router.get('/:id/download', downloadBook);
router.post('/', protect, authorize('admin'), upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), uploadBook);
router.put('/:id', protect, authorize('admin'), upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), updateBook);
router.delete('/:id', protect, authorize('admin'), deleteBook);

module.exports = router;