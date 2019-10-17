const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/people', (req, res) => {
    res.send(people);
});

app.get('/api/people/:id', (req, res) => {
    const course = people.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given ID was not found!')
    res.send(course);
});

app.post('/api/people', (req, res) => {
    const { error } = validateCourse(req.body); // body.error

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: people.length + 1,
        name: req.body.name
    };
    people.push(course);
    res.send(course);
});

app.put('/api/people/:id', (req, res) => {
    const course = people.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given ID was not found!');

    const { error } = validateCourse(req.body); // body.error

    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/people/:id', (req, res) => {
    const course = people.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course with given ID was not found!')

    const index = people.indexOf(course);
    people.splice(index, 1);

    res.send(course);
})

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const people = [
    {
        id: 1,
        name: "Jake"
    },
    {
        id: 2,
        name: "Tim"
    },
    {
        id: 3,
        name: "Paul"
    }
]