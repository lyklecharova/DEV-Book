const mongoose = require('mongoose');
const User = require('./User');

const booksSchema = new mongoose.Schema({
	title: String,
	image: String,
	url: String,
	additionalInfo: String,
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: User }
});

const Book = mongoose.model("Book", booksSchema);

module.exports = Book;