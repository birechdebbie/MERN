
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = 3000;


app.get('/', (req, res) => {
    res.send('Hello World PLP, how are you, whats up');
} );
// Middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
})

// Routes
app.get('/about', (req, res) => {
  res.send('About Page');
});

app.post('/contact', (req, res) => {
  res.send('Contact Page');
});

// Route Parameters
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// QUery Parameters
app.get('/search', (req, res) => {
  res.send(`Search Query: ${req.query.q}`);
});

// /search?q=value



// REST API

let users = [
    { id: 1, name: 'Dedan' },
    { id: 2, name: 'Doe' }
];

// CRUD - Create, Read, Update, Delete

// Create
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };

    users.push(newUser);
    res.status(201).json(newUser);
});


// Read
app.get('/users', (req, res) => {
    res.json(users);
})

// Read One
app.get('/users/:id', (req, res) => {
    const user = users.find( u => u.id === Number(req.params.id) );
    res.json(user);
})


// Update
app.put('/user/:id', (req, res) => {
    const user = users.find( u => u.id === Number(req.params.id) );
    user.name = req.body.name;
    res.json(user);
})


// Delete
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.status(204).send();
});




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

















app.listen(PORT, ()=> {
    console.log('Server is running on http://localhost:3000');
});