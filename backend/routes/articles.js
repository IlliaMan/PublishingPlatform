import express from 'express';
import ArticleModel from '../models/article.js';
import UserModel from '../models/user.js';
import { ACCESS_TOKEN_SECRET } from './keys.js';
import jwt from 'jsonwebtoken';

const articlesRouter = express.Router();

// Getting all
articlesRouter.get('/', async (request, response) => {
  try {
    const articles = await ArticleModel.find();
    response.json(articles);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

articlesRouter.get('/user', authenticateToken, async (req, res) => {
  try {
    const articles = await ArticleModel.find({ email: req.user.email });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting one 
articlesRouter.get('/:id', getArticle, (req, res) => {
  res.json(res.article);
});

// Creating one 
articlesRouter.post('/', authenticateToken, async (req, res) => {
  const article = new ArticleModel({
    email: req.user.email,
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newArticle = await article.save();
    // 201 - successfully created an object
    res.status(201).json(newArticle);
  } catch (error) {
    // 400 - something wrong with the user input
    res.status(400).json({ message: error.message });
  }
});

// Updating one 
articlesRouter.patch('/:id', getArticle, async (req, res) => {
  if(req.body.title !== undefined) {
    res.article.title = req.body.title;
  }
  if(req.body.content !== undefined) {
    res.article.content = req.body.content;
  }

  try {
    const updatedArticle = await res.article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deleting one 
articlesRouter.delete('/:id', getArticle, async (req, res) => {
  try {
    await res.article.deleteOne();
    res.json({ message: 'Deleted Article'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


articlesRouter.get('/likes/:id/check', [getArticle, authenticateToken], async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.user.email });

    user = users[0];

    if(user == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  try {
    console.log(res.article.likes);
    const likes = res.article.likes.filter(userId => userId.toString() === user._id.toString());
    console.log(likes);

    res.sendStatus(likes.length === 0 ? 204 : 200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

articlesRouter.post('/likes/:id', [getArticle, authenticateToken], async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.user.email });

    user = users[0];

    if(user == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  try {
    res.article.likes.push(user._id);

    const updatedUser = await res.article.save();

    res.json(updatedUser);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

articlesRouter.delete('/likes/:id', [getArticle, authenticateToken], async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.user.email });

    user = users[0];

    if(user == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  try {
    res.article.likes = res.article.likes.filter(userId => userId.toString() !== user._id.toString());

    const updatedUser = await res.article.save();

    res.json(updatedUser);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

async function getArticle(req, res, next) {
  let article;
  try {
    article = await ArticleModel.findById(req.params.id);
    if(article == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find Article"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.article = article;
  next();
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}


export default articlesRouter;