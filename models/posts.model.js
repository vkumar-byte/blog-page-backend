const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    allowNull: false,
    maxLength: 135,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    allowNull: true,
  },
  postImage: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Posts', blogPostSchema);
