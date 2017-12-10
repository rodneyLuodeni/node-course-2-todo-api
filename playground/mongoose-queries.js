const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const { Todo} = require('./../server/models/todo');
const { User} = require('./../server/models/user');


var userId = '5a2d949fd1b3a029287553ec';
// var id = '5a2d8ca87b8cc631b002b8ac11';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then( (todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then( (todo) => {
//     console.log('Todo', todo)
// });



// Todo.findById(id).then( (todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by id: ', todo)
// }).catch((error) => console.log(error));

if (ObjectID.isValid) {
    User.findById(userId).then( (result) => {
        console.log('User Id: ', result);
    }).catch( (error) => console.log('user Id not found') );
}
