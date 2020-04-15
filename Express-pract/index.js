const express = require('express');
const app = express();

// printing hello world in the given port
app.get('/', (req, res) => {
    res.send('HELLO WORLD!!!!!');
});

// printing the array given in the given port
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// printing the id in the given port 
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

// printing the month and year in the given port
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to the port ${port}.........`));