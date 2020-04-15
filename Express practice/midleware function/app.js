const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const app = express();

app.use(express.json());

app.use(logger);

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
    res.send('Hello World!!!!!!!!');
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course requested not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).require()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (!req.body.name || req.body.name.length < 3) {
        //400 Bad status
        res.status(400).send('Name is required and should be min 3 character');
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name       
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));