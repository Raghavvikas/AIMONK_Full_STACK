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

// // Model definition
// const Tree = sequelize.define('Tree', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     data: {
//         type: DataTypes.JSONB,
//         allowNull: false,
//     },
// });

// Sync the database
sequelize.sync();

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
