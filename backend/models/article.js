import mongoose, { Schema } from "mongoose";

const articleScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const ArticleModel = mongoose.model('Article', articleScheme);

export default ArticleModel;