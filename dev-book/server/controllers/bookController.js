const express = require("express");
const router = express.Router();
const { isLogUser } = require("../middleware/guards");

const Book = require('../models/Books');

// Create book - Logged
router.post("/add", isLogUser, async (req, res) => {
    const bookDetails = req.body;
    try {
        console.log(bookDetails);
        await Book.create({ ...bookDetails, ownerId: req.userId });
    } catch (error) {
        console.log(error);
    }
    res.status(200).send("Send");
});

router.get("/", async (req, res) => {
    const allBooks = await Book.find();
    // console.log(allBooks);
    res.json(allBooks);
});

router.get("/:id", async (req, res) => {
    try {
        const bookId = req.params.id
        const oneBook = await Book.findById(bookId);
        // console.log(oneBook);
        res.json(oneBook);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Edit book - Logged and owner
router.put("/:id", isLogUser, async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookDetails = await Book.findById(bookId);
        if (bookDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }
        const updateInfo = req.body;
        // new:true - returns the modified value
        const editedBook = await Book.findByIdAndUpdate(bookId, updateInfo, {
            new: true
        })
        res.json(editedBook);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Delete book - Logged and owner

router.delete("/:id", isLogUser, async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookDetails = await Book.findById(bookId);
        if (bookDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }

        await Book.findByIdAndDelete(bookId);
        res.json({ message: "Delete succesfully" });
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;