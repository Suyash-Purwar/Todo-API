const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to MongoDB server.', error);
    } else {
        console.log('Connected to MongoDB server.')

        db.collection('ToDo').deleteMany({text: 'Something Lorem Ipsum'}).then(result => {
            console.log(JSON.stringify(docs, undefined, 2));
        }, error => {
            console.log('Unable to read docs');
        });

        db.collection('ToDo').deleteOne({text: 'I have to study'}).then(result => {
            console.log(result);
        });

        db.collection('Users').findOneAndDelete({name: 'Mansi Purwar'}).then(result => {
            console.log(result.value);
            console.log(result);
        })

        db.collection('Users').deleteMany({name: 'Suyash Purwar'}).then(result => {
            console.log(result);
        }, error => {
            console.log('Unable to delete query from database');
        });

        db.collection('Users').findOneAndDelete({name: 'Shubham Purwar'}).then(result => {
            console.log(result);
        }) 
    }
})