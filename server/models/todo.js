let mongoose = require('mongoose');

let schema = mongoose.Schema({
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
})

let Todo = mongoose.model('todos', schema);

module.exports = {Todo};