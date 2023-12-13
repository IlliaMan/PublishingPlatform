import express from 'express';
import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './keys.js';

const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.find({ email, password });
    if(user == null || user.length === 0) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const accessToken = jwt.sign({ email }, ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

export default authRouter;