const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        description: String,
        category: String,
        dueDate: Date,
    });


module.exports = mongoose.model('Todo', taskSchema);