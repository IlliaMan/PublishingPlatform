import express from 'express';
import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './keys.js';

const authRouter = express.Router();

authRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await UserModel.find({ email, password });
    if(user == null || user.length === 0) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const accessToken = generateAccessToken(user[0]);
  res.json({ accessToken: accessToken });
});

function generateAccessToken(user) {
  return jwt.sign({ email: user.email, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

export default authRouter;