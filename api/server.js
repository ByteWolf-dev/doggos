const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory (includes your index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Serve static images from the "dogs" folder (images you want to display in the gallery)
app.use('/dogs', express.static(path.join(__dirname, 'dogs')));

// API endpoint to get the list of images in the dogs folder
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
