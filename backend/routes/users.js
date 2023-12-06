import express from 'express';
import UserModel from '../models/user.js';

const userRouter = express.Router();

// Getting all
userRouter.get('/', async (request, response) => {
  try {
    const users = await UserModel.find();
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Getting one 
userRouter.get('/:id', async (req, res) => {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if(user == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(user);
});

// Creating one 
userRouter.post('/', async (req, res) => {
  console.log(req.body);
  const user = new UserModel({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    // 201 - successfully created an object
    res.status(201).json(newUser);
  } catch (error) {
    // 400 - something wrong with the user input
    res.status(400).json({ message: error.message });
  }
});

export default userRouter;