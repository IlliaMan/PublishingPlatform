import express from 'express';
import ArticleModel from '../models/article.js';

const searchRouter = express.Router();

searchRouter.get('/:input', async (req, res) => {
  let articles;
  try {
    articles = await ArticleModel.find({});
    if(articles == null) {
      return res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }

  let searchResults = articles
    .filter(article => article.title.toLowerCase().includes(req.params.input.toLowerCase()))
    .map(article => ({ 
      id: article._id,
      title: article.title,
      email: article.email
    }));

  if (searchResults.length === 0) {
    for(let i = 0; i < (articles.length > 7 ? 7 : articles.length); i++) {
      searchResults.push({ 
        id: articles[i]._id,
        title: articles[i].title, 
        email: articles[i].email
      });
    }
  }
  
  res.json({ searchResults });
});

export default searchRouter;