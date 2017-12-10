var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Rodney:php123@ds135956.mlab.com:35956/todoapp-mongo-database');



module.exports = {
    mongoose
};
