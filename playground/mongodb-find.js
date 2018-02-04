const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        console.log('Unable to connect to MongoDB server,');
    } else {
        console.log('Connected to MongoDB server.');

        db.collection('ToDo').find({completed: true}).toArray().then(docs => {
            console.log('Todos:');
            console.log(JSON.stringify(docs, undefined, 2));
        }, err => {
            console.log('Unable to fetch data from MongoDB server.', err);
        });

        db.collection('Users').find().count().then(count => {
            console.log(`No. of users are: ${count}`);
        }, error => {
            console.log(`Unable to count no. of users`);
        });

        db.collection('Users').find({name: 'Mansi Purwar'}).toArray().then(user => {
            console.log('User found');
            console.log(JSON.stringify(user, undefined, 2));
        }, error => {
            console.log('Unable to find user');
        })
    }
});