// models/Tree.js
const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: { type: Object },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tree' }]
});

const Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;
