const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));
app.use('/dogs', express.static(path.join(__dirname, 'dogs')));

// API endpoint to get list of images
app.get('/api/images', (req, res) => {
    const imageFolder = path.join(__dirname, 'dogs');
    fs.readdir(imageFolder, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return res.status(500).json({ error: 'Unable to load images' });
        }
        // Filter only image files
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        res.json(imageFiles);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
