//route parameters
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

//query parameters

app.get('/search', (req, res) => {
  res.send(`Search query: ${req.query.q}`);
});
