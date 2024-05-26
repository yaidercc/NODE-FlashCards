const { Schema, model } = require("mongoose");

const flashcardSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "topic",
    required: true,
  },
});

module.exports = model("flashcard", flashcardSchema);
