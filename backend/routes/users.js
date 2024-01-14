import express from 'express';
import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './keys.js';

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

userRouter.get('/username/:email', async (req, res) => {
  const { email } = req.params;
  let user;
  try {
    user = await UserModel.find({ email });
    if(user == null || user.length === 0) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }

    res.json({ username: user[0].username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get('/icon/:email', async (req, res) => {
  const { email } = req.params;
  let users;
  try {
    users = await UserModel.find({ email });
    if(users == null || users.length === 0) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ icon: users[0].icon });
});

userRouter.patch('/article/:title', getUserByJWT, async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.user.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    user = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const index = user.articles.findIndex(article => article.title === req.params.title);
  if(index === -1) {
    return res.status(404).json({message: "cannot find article"});
  }

  console.log(user.articles[index]);
  user.articles[index].title = req.body.title;
  user.articles[index].content = req.body.content;
  
  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.delete('/article/:title', getUserByJWT, async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.user.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    user = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  user.articles = user.articles.filter(article => article.title !== req.params.title);
  
  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post('/article', getUserByJWT, async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.user.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    user = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  user.articles.push({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ban/Unban user
userRouter.patch('/banstatus', getUser, async (req, res) => {
  res.user.isBanned = req.body.isBanned;

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Creating one 
userRouter.post('/', async (req, res) => {
  console.log(req.body);
  const user = new UserModel({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    icon: req.body.icon
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

userRouter.get('/followers/list/:email', async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User", users: users });
    }
    user = users[0];
    res.json({ followers: user.followers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get('/following/list/:email', async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User", users: users });
    }
    user = users[0];
    res.json({ following: user.following });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get('/followers/:email/count', async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User", users: users });
    }
    user = users[0];
    res.json({ followersCount: user.followers.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get('/following/:email/count', async (req, res) => {
  let user;
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User", users: users });
    }
    user = users[0];
    res.json({ followingCount: user.following.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get('/following/:email/check', getUserByJWT, async (req, res) => {
  let currentUser, userToCheck;
  try {
    const users = await UserModel.find({ email: req.user.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User", users: users });
    }
    currentUser = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    userToCheck = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  console.log(currentUser);
  console.log(userToCheck);
  if(!currentUser.following.includes(userToCheck.email)) {
    res.sendStatus(204);
  } else {
    res.sendStatus(200);
  }
});

userRouter.post('/:email/follow/', getUserByJWT, async (req, res) => {
  let currentUser, userToFollow;
  try {
    const users = await UserModel.find({ email: req.user.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    currentUser = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    userToFollow = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    currentUser.following.push(userToFollow.email);
    userToFollow.followers.push(currentUser.email);

    await currentUser.save();
    await userToFollow.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post('/:email/unfollow/', getUserByJWT, async (req, res) => {
  let currentUser, userToUnfollow;
  try {
    const users = await UserModel.find({ email: req.user.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    currentUser = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  try {
    const users = await UserModel.find({ email: req.params.email });
    if(users == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
    userToUnfollow = users[0];
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    currentUser.following = currentUser.following
      .filter(email => email !== userToUnfollow.email);

    userToUnfollow.followers = userToUnfollow.followers
      .filter(email => email !== currentUser.email);
    
    await currentUser.save();
    await userToUnfollow.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await UserModel.find({ email: req.body.email });
    // console.log(user);
    if(user == null) {
      // 404 - cannot find something
      return res.status(404).json({ message: "cannot find User"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user[0];
  next();
}

async function getUserByJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
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


export default userRouter;