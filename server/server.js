const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const port = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            !todo ? res.status(404).send() : res.send({todo});
        }, (e) =>  res.status(400).send());
    }

});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        res.status(400).send();
    } else {
        Todo.findByIdAndRemove(id).then(todo => {
            !todo ? res.status(404).send() : res.status(200).send({todo});
        });
    }
}, (e) => res.send(e));

app.patch('/todos/:id', (req, res) => {
    const hexID = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(hexID)) {
        return res.status(400).send();
    } 

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(hexID, {$set: body}, {new: true}).then(todo => {
        !todo ? res.status(404).send() : res.status(200).send({todo});
    }).catch(e => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {app};