const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    console.log('Connected to MongoDb server');

    const db = client.db('TodoApp');

    // db.collection('Todos')
    //     .find({_id: new ObjectID('5a2b13464d0d642cccbef107')}).toArray()
    //     .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });



    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos: ${count} items found.`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    db.collection('Users').find({name: 'Effie'}).toArray().then( (users) => {
        console.log(JSON.stringify(users, undefined, 2));
    }, (error) => {
        console.log('There was an error fetching the users.', error);
    })

    // client.close();
});