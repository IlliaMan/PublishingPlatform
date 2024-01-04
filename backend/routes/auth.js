import express from 'express';
import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './keys.js';

const authRouter = express.Router();

let refreshTokens = [];

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await UserModel.find({ email, password });
    if(user == null || user.length === 0) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User" });
    }

    if(user[0].isBanned) {
      return res.status(403).json({ message: "your account has been banned" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const accessToken = generateAccessToken(user[0]);
  const refreshToken = jwt.sign({ email: user[0].email, role: user[0].role}, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

authRouter.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
});

authRouter.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken({ email: user.email, role: user.role });
    res.json({ accessToken: accessToken });
  });
});

function generateAccessToken(user) {
  return jwt.sign({ email: user.email, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}

export default authRouter;