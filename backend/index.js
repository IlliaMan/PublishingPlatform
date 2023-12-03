import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

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