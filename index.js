const express = require('express');
const https = require('https');
const fs = require('fs');

// Import routes
const routes = require('./routes/students')

// Create Express app
const app = express();

app.use(express.json())

// Mount routes
app.use('/sfbu', routes)

// Read the key and certificate files
const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// Create HTTPS server with Express app
const server = https.createServer(options, app);

// HTTPS default port
const port = 8080;

server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
})
