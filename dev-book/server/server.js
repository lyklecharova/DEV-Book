const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./router/router');
const verifyToken = require('./middleware/authMidleware');
const { PORT, MONGO_DB_CONNECTION_STRING } = require('./constants/constants');
const dns = require('node:dns');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(verifyToken);
app.use(routes);

async function main() {
    try {
        await mongoose.connect(MONGO_DB_CONNECTION_STRING);
        console.log('DB connected');

        app.listen(PORT, () => {
            console.log('Server running on', PORT);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
}

main();
