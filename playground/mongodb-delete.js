const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');

        // db.collection('Todos').deleteMany({ text: 'walk the dog'}).then( (result) => {
        //     console.log(result);
        // });

        // db.collection('Todos').deleteOne({text: 'Buy groceries'}).then( (result) => {
        //     console.log(result);
        // });

        // db.collection('Todos').findOneAndDelete({completed: false}).then( (result) => {
        //     console.log(result);
        // })

    db.collection('Users').deleteMany({name: 'Rodney'}).then( (result) => {
        console.log(result);
    });
    
    db.collection('Users').findOneAndDelete({_id: 123}).then( (result) => {
        console.log(result);
    });


    // db.collection('Users').find({name: 'Effie'}).toArray().then( (users) => {
    //     console.log(JSON.stringify(users, undefined, 2));
    // }, (error) => {
    //     console.log('There was an error fetching the users.', error);
    // })

    // client.close();
});