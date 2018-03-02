const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');

// Todo.remove({}).then(result => {
//     console.log(result);
// });

Todo.findByIdAndRemove('5a99670ea25fc816c876440a').then(todo => {
    console.log(todo);
})