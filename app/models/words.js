import mongoose, { Schema } from "mongoose";

// Clear Mongoose models
mongoose.models = {};
mongoose.modelSchemas = {};

const wordSchema = new Schema(
  {
    word: String,
    description: String,
  },
  { timestamps: true }
);

const Word = mongoose.models.Word || mongoose.model("Word", wordSchema);
export default Word;
