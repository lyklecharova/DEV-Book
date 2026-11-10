const express = require('express');
const router = express.Router();
const { isLogUser } = require('../middleware/guards');

const Book = require('../models/Books');

// Create book - Logged
router.post('/add', isLogUser, async (req, res) => {
    const bookDetails = req.body;
    try {
        console.log(bookDetails);
        await Book.create({ ...bookDetails, ownerId: req.userId });
    } catch (error) {
        console.log(error);
    }
    res.status(200).send('Send');
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

        const updateInfo = {};

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
        if (bookDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }

        await Book.findByIdAndDelete(bookId);
        res.json({ message: 'Delete succesfully' });
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;
