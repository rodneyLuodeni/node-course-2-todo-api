const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    console.log('Connected to MongoDb server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: true
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Could not insert document'), error;
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Rodney',
    //     age: 30
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Could not insert user: ', error);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 4))

    // });

    client.close();
});