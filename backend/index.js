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
  res.json({ userName: "UserNumberOne"});
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});