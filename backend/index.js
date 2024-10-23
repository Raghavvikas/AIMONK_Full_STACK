const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Tree = require('./models/tree')

// Import routes
const tagRoutes = require('./routes/tags');
const app = express();
const PORT = process.env.PORT || 3000;

let savedTree = null;

// Use the tag routes
app.use('/api/tags', tagRoutes);

// index.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database setup
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

// Endpoint to save the tree data
app.post('/api/saveTree', (req, res) => {
    const treeData = req.body.data;

    // Save to JSON file
    saveToFile(treeData)
        .then(() => res.status(200).send('Tree data saved successfully.'))
        .catch((error) => {
            console.error('Error saving tree data:', error);
            res.status(500).send('Failed to save tree data.');
        });
});



// Function to save the tree data to a JSON file
const saveToFile = async (data) => {
    const filePath = path.join(__dirname, 'treeData.json');

    // Parse JSON string to object
    const treeObject = JSON.parse(data);

    // Write the object to a file
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(treeObject, null, 2), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

// Sync the database
// sequelize.sync();

// Routes
app.get('/api/tags', async (req, res) => {
    const trees = await Tree.findAll();
    res.json(trees);
});

app.post('/api/tags', async (req, res) => {
    const { name, data } = req.body;
    const newTree = await Tree.create({ name, data });
    res.json({ message: "Tree saved successfully", tree: newTree });
});

app.put('/api/tags/:id', async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const tree = await Tree.findByPk(id);
    if (tree) {
        tree.data = data;
        await tree.save();
        res.json(tree);
    } else {
        res.status(404).send('Tree not found');
    }
});




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
