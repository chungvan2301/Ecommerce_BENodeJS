const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
