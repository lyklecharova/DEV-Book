const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./router/router');
const verifyToken = require("./middleware/authMidleware");
const { PORT, MONGO_DB_CONNECTION_STRING } = require("./constants/constants");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(verifyToken);
app.use(routes);

app.listen(PORT, () => console.log("Server running on", PORT));

async function main() {
    await mongoose.connect(MONGO_DB_CONNECTION_STRING);
    console.log("DB connected")
};

main();