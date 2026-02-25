const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
// Only try port fallback locally when a platform hasn't provided a PORT.
const ENABLE_PORT_FALLBACK = !process.env.PORT;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Some browsers request /favicon.ico by default. Redirect to our SVG favicon.
app.get('/favicon.ico', (req, res) => {
    res.redirect(302, '/favicon.svg');
});

// Serve HTML from 'views' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Lightweight health check endpoint (useful for Render/uptime checks)
app.get('/healthz', (req, res) => {
    res.status(200).type('text/plain').send('ok');
});

// Function to start server with auto port fallback
function startServer(port) {
    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`Birthday server listening on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            if (ENABLE_PORT_FALLBACK) {
                console.log(`Port ${port} is already in use, trying port ${port + 1}...`);
                startServer(port + 1);
            } else {
                console.error(`Port ${port} is already in use. Refusing to auto-select a different port because PORT was provided by the platform.`);
                process.exit(1);
            }
        } else {
            console.error('Error starting server:', err);
            process.exit(1);
        }
    });
}

startServer(PORT);
