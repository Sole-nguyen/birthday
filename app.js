const express = require('express');
const path = require('path');

const app = express();
let PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML from 'views' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Function to start server with auto port fallback
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`🌸 Birthday server running at http://localhost:${port}`);
        console.log(`🌷 Garden of Love is ready for Thảo Ly!`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`⚠️  Port ${port} is already in use, trying port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Error starting server:', err);
            process.exit(1);
        }
    });
}

startServer(PORT);
