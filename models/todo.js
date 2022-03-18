const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title:  String,
  date:Number
});

const todos = mongoose.model("todos", TodoSchema);

module.exports = todos;