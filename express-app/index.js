const express = require('express');
const app = express();
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello, World! This is my first server!, I love it here!');
});

app.use((req, res, next) => {
  console.log( `${req.method} ${req.url}`);
  next();
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/contact', (req, res) => {
  res.send('Contact page');
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});