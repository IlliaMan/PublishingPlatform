import express from 'express';

const searchRouter = express.Router();

searchRouter.get('/', async (req, res) => {
  res.json({ searchResults: ['hello', 'new', 'old']});
});

export default searchRouter;