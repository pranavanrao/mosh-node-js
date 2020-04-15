const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id : 1, name : 'course1'},
    { id : 2, name : 'course2'},
    { id : 3, name : 'course3'}
];

// HTTP GET REQUEST

app.get('/api/courses', (req, res) => {
    
    res.send(courses);

});

app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Bad Request
    if (!course) res.status(404).send('The course with the given id has not found!!!');
    res.send(course);

});

// HTTP POST REQUEST

app.post('/api/courses', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// HTTP PUT REQUEST

app.put('/api/courses/:id', (req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Bad Request
    if (!course) res.status(404).send('The course with the given id has not found!!!');
    
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

// HTTP DELETE REQUEST

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Bad Request
    if (!course) res.status(404).send('The course with the given id has not found!!!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});

// PRINTING ON THE PORT

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}.........`));