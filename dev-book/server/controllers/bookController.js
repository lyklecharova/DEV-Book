const express = require('express');
const multer = require('multer');
const router = express.Router();
const { isLogUser } = require('../middleware/guards');

const Book = require('../models/Books');
const { uploadBookImage, deleteBookImage, ALLOWED_TYPES, MAX_BYTES } = require('../services/storage');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_BYTES },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_TYPES.has(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Image must be a JPEG, PNG, or WebP under 2 MB'));
        }
    },
});

function handleUpload(req, res, next) {
    upload.single('image')(req, res, (err) => {
        if (!err) {
            next();
            return;
        }

        const message = err.code === 'LIMIT_FILE_SIZE'
            ? 'Image must be a JPEG, PNG, or WebP under 2 MB'
            : err.message;

        res.status(400).json({ error: message });
    });
}

// Create book - Logged
router.post('/add', isLogUser, handleUpload, async (req, res) => {
    try {
        const { title, url, additionalInfo } = req.body;

        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({
                error: 'Book title is required',
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'Image file is required',
            });
        }

        const image = await uploadBookImage(req.file);

        const newBook = await Book.create({
            title: title.trim(),
            image,
            url,
            additionalInfo,
            ownerId: req.userId,
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: 'Failed to create book',
        });
    }
});

router.get('/', async (req, res) => {
    const allBooks = await Book.find();
    // console.log(allBooks);
    res.json(allBooks);
});

router.get('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const oneBook = await Book.findById(bookId);
        // console.log(oneBook);
        res.json(oneBook);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Edit book - Logged and owner
router.put('/:id', isLogUser, handleUpload, async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookDetails = await Book.findById(bookId);

        if (!bookDetails) {
            return res.status(404).json({
                error: 'Book not found',
            });
        }

        if (bookDetails.ownerId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                error: 'You are not allowed to edit this book',
            });
        }

        const { title, url, additionalInfo } = req.body;

        const updateInfo = {};

        if (title !== undefined) updateInfo.title = title;
        if (url !== undefined) updateInfo.url = url;
        if (additionalInfo !== undefined)
            updateInfo.additionalInfo = additionalInfo;
        if (req.file) {
            updateInfo.image = await uploadBookImage(req.file);
        }

        const editedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: updateInfo },
            {
                new: true,
                runValidators: true,
            },
        );

        if (req.file) {
            await deleteBookImage(bookDetails.image);
        }

        res.json(editedBook);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: 'Failed to update book',
        });
    }
});

// Delete book - Logged and owner
router.delete('/:id', isLogUser, async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookDetails = await Book.findById(bookId);

        if (!bookDetails) {
            return res.status(404).json({
                error: 'Book not found',
            });
        }

        if (bookDetails.ownerId.toString() !== req.userId.toString()) {
            return res.status(403).json({
                error: 'You are not allowed to delete this book',
            });
        }

        await Book.findByIdAndDelete(bookId);
        await deleteBookImage(bookDetails.image);

        res.json({
            message: 'Book deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: 'Failed to delete book',
        });
    }
});

module.exports = router;
