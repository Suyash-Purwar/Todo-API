let express = require('express');
let bodyParser = require('body-parser');
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
        res.send({
            todos
        });
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
            if (!todo) {
                res.status(404).send();
            } else {
                res.send({todo});
            }
        }, (e) => {
            res.status(400).send()
        });
    }

});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        res.status(400).send();
    } else {
        Todo.findByIdAndRemove(id).then(todo => {
            if (!todo) {
                res.send(404).send();
            } else {
                res.send(todo);
            }
        });
    }
}, err => {
    res.status(400).send();
});

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {app};