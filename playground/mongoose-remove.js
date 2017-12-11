const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const { Todo} = require('./../server/models/todo');
const { User} = require('./../server/models/user');


// Todo.remove

// Todo.remove({}).then( (result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5a2eec12d1b3a029287553ed').then( (todo) => {
    console.log(todo)
});