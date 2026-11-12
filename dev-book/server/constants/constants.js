require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3030;
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

module.exports = {
    JWT_SECRET,
    PORT,
    MONGO_DB_CONNECTION_STRING
};