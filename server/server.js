const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose } = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());


// POST Todo
app.post('/todos', (request, response) => {
    var todo = new Todo({
       text: request.body.text
    });

    todo.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    });
});

//GET /todos
app.get('/todos', (request, response) => {
    Todo.find().then( (todos) => {
        response.send({todos});
    }, (error) => {
        response.status(400).send(error);
    });
});


//Get /todo/12345
app.get('/todo/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        response.status(404).send();
    }

    Todo.findById(id).then( (todo) => {
        if(todo) {
            response.status(200).send({todo});
        } else {
            response.status(404).send();
        }
    }, (error) => {
        response.status(400).send();
    });
});


app.delete('/todo/:id', (request, response) => {
    var id = request.params.id;
    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Todo.findByIdAndRemove(id).then( (result) => {
        if (!result) {
            return response.status(404).send({statusText: "resource not found"});
        }

        response.status(200).send({result })

    }, (error) => {
       return response.status(404).send({error: error });
    });

});



app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed === true ) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {
        new: true
    }).then( (todo) => {
        if (!todo) {
            return response.status(404).send();
        }

        response.send({ todo: todo});
    }).catch( (error) => {
        response.status(400).send();
    });

});


app.listen(port, () => {
    console.log(`started on port ${port}`);
});



module.exports = {
    app
}
