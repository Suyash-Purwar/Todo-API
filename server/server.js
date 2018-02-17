var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let todoApp = mongoose.model('todos', {
    text: {
        type: String,
        required: true,  // will make sure 'text' property exists
        minlength: 1,    // will make the value of 'text' property must heve length greater than 0
        trim: true       // remove extra white spaces
    },

    completed: {
        type: Boolean,
        default: false // Sets the default value of 'completed' property to false, if value is not provided
    },

    completedAt: {
        type: Number,
        default: null
    }
});

let Users = mongoose.model('users', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

let newUser = new Users({
    email: 'shubhampurwar4035@gmail.com'
});

newUser.save().then(result => {
    console.log(result);
}, error => {
    console.log(error);
})

// let newTodo = new todoApp({
//     text: '  Go and do some fishing  ',
//     completed: false
// });

// newTodo.save().then(error => {
//     console.log('Unbale to save todo', error);
// }, doc => {
//     console.log('Todo saved', doc)
// });