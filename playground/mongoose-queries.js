const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user.js');

// const id = "5a896ab3ce7f181c2c006c241";

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid')
// }

// // Todo.find({
// //     _id: id
// // }).then((todos) => {
// //     console.log(`Todos ${todos} \n`);
// // });

// // Todo.findOne({
// //     _id: id
// // }).then((todo) => {
// //     console.log(`Todo ${todo} \n`);
// // });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log(`Todo ${todo} \n`); 
// }).catch((e) => console.log('Id not invalid'));

// User.findById


User.findById("5a799bb9ed46ef14f0e50e6b").then((todo) => {
    if(!todo) {
        return console.log('Note not found');
    } 
    console.log(`Todo ${JSON.stringify(todo, undefined, 3)}`);
}, (e) => console.log('Note note valid'));