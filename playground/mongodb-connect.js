const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        const id = new ObjectID();
        console.log(id);

        console.log('Connected to MongoBD server.');

        db.collection('ToDo').insertOne({
            text: 'Something Lorem Ipsum',
            demand: true,
            completed: false
        }, (err, result) => {
            if (err) {
                console.log('Unable to write in Todo collection', err);
            } else {
                console.log(JSON.stringify(result.ops, undefined, 2));
            }
        })

        db.collection('Users').insertOne({
            name: 'Mansi Purwar',
            age: 21,
            location: 'Uttar Pradesh, Etawah, Bajaria Chairahah'
        }, (err, res) => {
            if (err) {
                console.log('Unable to write in User collection', err);
            } else {
                console.log(JSON.stringify(res.ops, undefined, 2));
            }
        })

        db.close();
    }
})