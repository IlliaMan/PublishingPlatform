import express from 'express';
import ArticleModel from '../models/article.js';

const articlesRouter = express.Router();

// Getting all
articlesRouter.get('/', async (request, response) => {
  try {
    const artciles = await ArticleModel.find();
    response.json(artciles);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export default articlesRouter;