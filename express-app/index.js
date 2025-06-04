const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const port = 3000

app.use(express.json());

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


//route parameters
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

//query parameters

app.get('/search', (req, res) => {
  res.send(`Search query: ${req.query.q}`);
});


let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];


//CRUD operations
//create
app.post('/users', (req, res) => {
  const newUser = {id: users.length + 1, name: req.body.name};
  users.push(newUser);
  res.status(201).json(newUser);
});


//read
app.get('/users', (req, res) => {
  res.json(users);
});

//read one user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id ==(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

//update
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id ==(req.params.id));
  if (!user) return res.status(404).send('User not found');
  
  user.name = req.body.name;
  res.json(user);
}); 


//delete
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id ==(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');
  
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});


// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));












app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});