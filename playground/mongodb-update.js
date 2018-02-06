const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to MongoDB server.')
    } else {
        console.log('Connected to MongoDB server.');

        // db.collection('ToDo').findOneAndUpdate({
        //     _id: new ObjectID("5a76f82895a73fda51aa518c")
        // }, {
        //     $set: {
        //         completed: true
        //     }
        // }, {
        //     returnOriginal: true
        // }).then(result => {
        //     console.log(result);
        // }, error => {
        //     console.log('Unable to upadate the document');
        // });

        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID("5a76ec6795a73fda51aa4dea")
        }, {
            $inc: {
                age: -6
            },

            $set: {
                name: 'Suyash Purwar',
                location: 'Etawah, Uttar Pradesh, India'
            }
        }, {
            returnOriginal: false
        }).then(result => {
            console.log(result);
        }, error => {
            console.log(error);
        });
    }
});