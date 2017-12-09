const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');


    // db.collection('Todos').findOneAndUpdate(
    //     {text: 'Buy groceries'},
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     },
    //     {returnOriginal: false}
    // ).then( (result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate(
            {name: 'Stefan'}, 
            { 
                $set: {
                    name : 'Rodney'  
                },
                $inc: {
                    age: +1
                }
            }, 
            {returnOriginal: false}).then( (result) => {
                console.log(result);
            }) 

    // client.close();
});