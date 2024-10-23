// routes/tags.js
const express = require('express');
const router = express.Router();

// GET all tags
router.get('/', (req, res) => {
    res.json({ tags: ["tag1", "tag2", "tag3"] });
});

// POST a new tag
router.post('/', (req, res) => {
    const newTag = req.body.tag;
    // Logic to save the tag
    res.status(201).json({ message: 'Tag created', tag: newTag });
});

// Export the router
module.exports = router;
