const express = require('express');
const router = express.Router();
const { isLogUser } = require('../middleware/guards');

const Book = require('../models/Books');
const User = require('../models/User');

// Create book - Logged
router.post('/add', isLogUser, async (req, res) => {
    try {
        const { title, image, url, additionalInfo } = req.body;

        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({
                error: 'Book title is required',
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const newBook = await Book.create({
            title: title.trim(),
            image,
            url,
            additionalInfo,
            ownerId: req.userId,
            submittedByEmail: user.email,
            status: 'pending',
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: 'Failed to create book',
        });
    }
});

// Public catalog - show only approved books
router.get('/', async (req, res) => {
    try {
        const approvedBooks = await Book.find({ status: 'approved' });
        res.json(approvedBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to load books' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const oneBook = await Book.findOne({ _id: bookId, status: 'approved' });
        // console.log(oneBook);
        res.json(oneBook);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Edit book - Logged and owner
router.put('/:id', isLogUser, async (req, res) => {
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

        const { title, image, url, additionalInfo } = req.body;

        const updateInfo = {
            status: 'pending',
        };

        if (title !== undefined) updateInfo.title = title;
        if (image !== undefined) updateInfo.image = image;
        if (url !== undefined) updateInfo.url = url;
        if (additionalInfo !== undefined)
            updateInfo.additionalInfo = additionalInfo;

        const editedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: updateInfo },
            {
                new: true,
                runValidators: true,
            },
        );

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
