let mongoose = require('mongoose');

let schema = {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
};

let User = mongoose.model('users', schema);

module.exports = {User};