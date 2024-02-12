const express = require("express");
const router = express.Router();

const bookController = require('../controllers/bookController');
router.use(`/book`, bookController);

const userController = require('../controllers/userController');
router.use(`/user`, userController);

module.exports = router;