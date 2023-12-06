import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import articlesRouter from './routes/articles.js'
import userRouter from './routes/users.js';

const DATABASE_URL = 'mongodb://localhost:27017/test';

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => {
  console.log(error);
});
db.once('connected', () => console.log('connected to the database'));
db.once('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/articles', articlesRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/login', (req, res) => {
  console.log(req.query);
  const { email, password } = req.query;
  if(email.length === 0 || password.length === 0) {
    res.status(404).json({
      message: "No email or password"
    });
  } else {
    res.json({ userName: "UserNumberOne"});
  }
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

export default app;