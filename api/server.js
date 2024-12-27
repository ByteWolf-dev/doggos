const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dogs', express.static(path.join(__dirname, 'dogs')));

app.get('/api/images', (req, res) => {
    const imageFolder = path.join(__dirname, 'dogs');

    fs.readdir(imageFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to load images' });
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        res.json(imageFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
