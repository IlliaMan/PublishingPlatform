import mongoose from "mongoose";

const articleScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const ArticleModel = mongoose.model('Article', articleScheme);

export default ArticleModel;